import React from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

import { locationChanged } from 'actions/preload';
import { appReady } from 'actions/global';
import { routeConfig } from 'components/Routes';
import { hasPageLocationChanged, extractInitialData } from 'utils';
import { wrapPromise as wrapPromiseWithProgress } from 'components/ProgressBar';

const getFetchResult = (routes, location, options) => {
  const branch = matchRoutes(routes, location.pathname);
  const fetchResult = branch
    .filter(({ route }) => route.component && route.component.fetch)
    .map(({ route, match }) => {
      return route.component.fetch(match, location, options);
    })
    .reduce((a, b) => a.concat(b), [])
    .filter(result => result);
  if (fetchResult.length > 0) {
    return fetchResult;
  } else {
    return [{
      promise: Promise.resolve()
    }];
  }
};

class PreloadSwitch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAppFetching: false,
      appFetchingError: null,
      initialData: null,
      ready: false,
    };
  }

  componentWillMount () {
    this.fetchRoutes({
      nextLocation: this.props.location,
      location: null
    });
  }

  componentWillReceiveProps (nextProps) {
    const nextLocation = nextProps.location;
    const location = this.props.location;
    if (hasPageLocationChanged(nextLocation, location)) {
      this.fetchRoutes({
        nextLocation,
        location
      });
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !nextState.isAppFetching;
  }

  fetchRoutes ({ nextLocation, location }) {
    const { store } = this.context;
    const { dispatch } = store;
    this.setState({
      isAppFetching: true,
      appFetchingError: null,
    });
    const opts = { store, dispatch, prevLocation: location };
    const fetchResult = getFetchResult(routeConfig, nextLocation, opts);
    const promise = Promise.all(fetchResult.map(item => item.promise));
    wrapPromiseWithProgress(promise).then(values => {
      const fetchNames = fetchResult.map(item => item.prop);
      const initialData = extractInitialData(fetchNames, values);
      this.setState({ initialData });
    })
    .catch((err) => {
      this.setState({ appFetchingError: err });
    }).finally(() => {
      this.setState({
        isAppFetching: false,
        ready: true,
      });
      dispatch(locationChanged({
        location: nextLocation,
        prevLocation: location
      }));
      dispatch(appReady());
    });
  }

  render () {
    const { ready, initialData } = this.state;
    if (!ready) {
      return null;
    }
    //todo: revise somehow.
    const children = React.Children.map(this.props.children, child => {
      const ViewComponent = child.props.component;
      return React.cloneElement(child, {
        component: null,
        render: (props) => (
          <ViewComponent {...props} initialData={initialData} />
        )
      });
    });
    return (
      <Switch>
        {children}
      </Switch>
    );
  }
}

PreloadSwitch.contextTypes = {
  store: PropTypes.object.isRequired,
};

PreloadSwitch.propTypes = {
  /**
   * location object
   */
  location: PropTypes.object.isRequired,
  /**
   * children
   */
  children: PropTypes.node,
};

export default withRouter(PreloadSwitch);
