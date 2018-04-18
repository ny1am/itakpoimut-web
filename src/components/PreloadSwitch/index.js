import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import { wrapWithProgress } from 'components/ProgressBar';

import extractFetchConfig from './utils/extractFetchConfig';
import enhanceRouteWithProps from './utils/enhanceRouteWithProps';
import extractInitialData from './utils/extractInitialData';

class PreloadSwitch extends React.Component {

  state = {
    isAppFetching: false,
    initialData: null,
    ready: false,
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
    if (nextLocation !== location) {
      this.fetchRoutes({
        nextLocation,
        location
      });
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !nextState.isAppFetching;
  }

  getRouteConfig() {
    const { routeConfig } = this.props;
    const loggedUser = this.context.store.getState().auth.loggedUser;
    return routeConfig.filter(({ secure }) => (!secure || secure(loggedUser)));
  }


  getFetchConfig({ nextLocation, location }) {
    const { store: { dispatch } } = this.context;
    const config = this.getRouteConfig();
    const fetchResult = extractFetchConfig(nextLocation, config, {
      dispatch,
      prevLocation: location
    });
    return fetchResult;
  }

  fetchRoutes ({ nextLocation, location }) {
    this.setState({ isAppFetching: true });
    const fetchResult = this.getFetchConfig({ nextLocation, location });

    let promise = Promise.resolve();
    if (fetchResult) {
      const fetchPromises = fetchResult.map(item => item.promise);
      const fetchKeys = fetchResult.map(item => item.prop);
      promise = wrapWithProgress(Promise.all(fetchPromises))
        .then(values => extractInitialData(fetchKeys, values))
        .then(initialData => {
          this.setState({ initialData });
          return initialData;
        });
    }
    promise = promise
      .then(data => {
        this.setState({
          isAppFetching: false,
          ready: true,
        });
        const { onFetchSuccess } = this.props;
        onFetchSuccess && onFetchSuccess({ nextLocation, location });
        return data;
      })
      .catch(error => {
        this.setState({
          isAppFetching: false,
          ready: true,
        });
        const { onFetchError } = this.props;
        onFetchError && onFetchError({ error });
      });
    return promise;
  }

  render () {
    const { ready, initialData } = this.state;
    const { children, location } = this.props;
    if (!ready) {
      return null;
    }
    return (
      <Switch location={location}>
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
  routeConfig: PropTypes.array.isRequired,
  onFetchSuccess: PropTypes.func,
  onFetchError: PropTypes.func,
  /**
   * children
   */
  children: PropTypes.node,
};

export default PreloadSwitch;
