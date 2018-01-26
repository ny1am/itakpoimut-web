import React from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

import * as preload from 'actions/preload';
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
    this.fetchRoutes(this.props, null);
  }

  componentWillReceiveProps (nextProps) {
    const { props } = this;
    if (hasPageLocationChanged(props.location, nextProps.location)) {
      this.fetchRoutes(nextProps, props.location);
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !nextState.isAppFetching;
  }

  fetchRoutes (props, prevLocation) {
    const { location } = props;
    const { store } = this.context;
    this.setState({
      isAppFetching: true,
      appFetchingError: null,
    });
    const opts = { store, dispatch: store.dispatch, prevLocation };
    const preloadOpts = {
      prevRoute: this.props.location.pathname,
      route: props.location.pathname,
      hash: props.location.hash,
    };
    const fetchResult = getFetchResult(routeConfig, location, opts);
    const promise = Promise.all(fetchResult.map(item => item.promise));
    store.dispatch(preload.start(preloadOpts));
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
      store.dispatch(preload.end(preloadOpts));
      store.dispatch(appReady());
    });
  }

  render () {
    const { ready, initialData } = this.state;
    if (!ready) {
      return null;
    }
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
