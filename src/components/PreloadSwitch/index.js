import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import { wrapWithProgress } from 'components/ProgressBar';

import extractFetchConfig from './utils/extractFetchConfig';
import enhanceRouteWithProps from './utils/enhanceRouteWithProps';
import extractInitialData from './utils/extractInitialData';

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
    const { routeConfig, loggedUser } = this.props;
    if (!loggedUser) {
      return routeConfig.filter(cfg => !cfg.secure);
    }
    return routeConfig;
  }

  getFetchConfig({ nextLocation, location }) {
    const { store } = this.context;
    const config = this.getRouteConfig();
    const fetchResult = extractFetchConfig(nextLocation, config, {
      store,
      dispatch: store.dispatch,
      prevLocation: location
    });
    return {
      fetchKeys: fetchResult.map(item => item.prop),
      fetchPromises: fetchResult.map(item => item.promise)
    };
  }

  fetchRoutes ({ nextLocation, location }) {
    this.setState({ isAppFetching: true });
    const { fetchKeys, fetchPromises } =
      this.getFetchConfig({ nextLocation, location });

    const promise = wrapWithProgress(Promise.all(fetchPromises))
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
      const { onDataFetched } = this.props;
      onDataFetched && onDataFetched({ nextLocation, location });
    });
    return promise;
  }

  render () {
    const { ready, initialData } = this.state;
    const { children, location, passThroughProps } = this.props;
    if (!ready) {
      return null;
    }
    return (
      <Switch location={location}>
        {React.Children.map(children, child => (
          enhanceRouteWithProps(child, { initialData, ...passThroughProps })
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
  //todo: change to isLogged
  loggedUser: PropTypes.object,
  onDataFetched: PropTypes.func,
  //todo: not sure if needed
  passThroughProps: PropTypes.object,
  /**
   * children
   */
  children: PropTypes.node,
};

export default PreloadSwitch;
