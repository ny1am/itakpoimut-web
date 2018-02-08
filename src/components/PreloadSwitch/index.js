import React from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';

import { locationChanged } from 'actions/preload';
import { appReady } from 'actions/global';
import { enhanceRouteWithProps } from 'components/Routes';
import { hasPageLocationChanged, extractInitialData } from 'utils';
import { wrapPromise as wrapPromiseWithProgress } from 'components/ProgressBar';

import extractFetchConfig from './extractFetchConfig';

class PreloadSwitch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAppFetching: false,
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
    //checks if actual location changed (not dialog via location.state)
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

  getFetchConfig({ nextLocation, location }) {
    const { store } = this.context;
    const { dispatch } = store;
    const fetchResult = extractFetchConfig(nextLocation, {
      store,
      dispatch,
      prevLocation: location
    });
    return {
      fetchKeys: fetchResult.map(item => item.prop),
      fetchPromises: fetchResult.map(item => item.promise)
    };
  }

  onDataFetched ({ nextLocation, location }) {
    const { store: { dispatch } } = this.context;
    dispatch(locationChanged({
      location: nextLocation,
      prevLocation: location
    }));
    dispatch(appReady());
  }

  fetchRoutes ({ nextLocation, location }) {
    this.setState({ isAppFetching: true });
    const { fetchKeys, fetchPromises } =
      this.getFetchConfig({ nextLocation, location });

    const promise = wrapPromiseWithProgress(Promise.all(fetchPromises))
    .then(values => extractInitialData(fetchKeys, values))
    .then(initialData => {
      this.setState({ initialData });
      return initialData;
    })
    .finally(() => {
      this.setState({
        isAppFetching: false,
        ready: true,
      });
    })
    .finally(() => {
      this.onDataFetched({ nextLocation, location });
    });
    return promise;
  }

  render () {
    const { ready, initialData } = this.state;
    const { children } = this.props;
    if (!ready) {
      return null;
    }
    return (
      <Switch>
        {React.Children.map(children, child => (
          enhanceRouteWithProps(child, { initialData })
        ))}
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
