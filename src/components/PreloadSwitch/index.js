import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { wrapWithProgress } from 'components/ProgressBar';
import { getFetchResult } from 'actions/preload';

import enhanceRouteWithProps from './utils/enhanceRouteWithProps';
import extractInitialData from './utils/extractInitialData';

class PreloadSwitch extends React.Component {
  state = {
    isAppFetching: false,
    initialData: null,
    ready: false,
  };

  componentWillMount() {
    this.fetchRoutes({
      nextLocation: this.props.location,
      location: null,
    });
  }

  componentWillReceiveProps(nextProps) {
    const nextLocation = nextProps.location;
    const location = this.props.location;
    if (nextLocation !== location) {
      this.fetchRoutes({
        nextLocation,
        location,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.isAppFetching;
  }

  fetchRoutes({ nextLocation, location }) {
    this.setState({ isAppFetching: true });
    let promise = this.props
      .dispatch(
        getFetchResult({
          routeConfig: this.props.routeConfig,
          location: nextLocation,
          fetchOptions: {
            dispatch: this.props.dispatch,
            prevLocation: location,
          },
        })
      )
      .then((fetchResult) => {
        let promise = Promise.resolve();
        if (fetchResult && Object.keys(fetchResult).length > 0) {
          const fetchPromises = fetchResult.map((item) => item.promise);
          const fetchKeys = fetchResult.map((item) => item.prop);
          promise = wrapWithProgress(Promise.all(fetchPromises))
            .then((values) => extractInitialData(fetchKeys, values))
            .then((initialData) => {
              this.setState({ initialData });
              return initialData;
            });
        }
        return promise;
      });
    promise = promise
      .then((data) => {
        this.setState({
          isAppFetching: false,
          ready: true,
        });
        const { onFetchSuccess } = this.props;
        onFetchSuccess && onFetchSuccess({ nextLocation, location });
        return data;
      })
      .catch((error) => {
        this.setState({
          isAppFetching: false,
          ready: true,
        });
        const { onFetchError } = this.props;
        onFetchError && onFetchError({ error });
      });
    return promise;
  }

  render() {
    const { ready, initialData } = this.state;
    const { children, location } = this.props;
    if (!ready) {
      return null;
    }
    return (
      <Switch location={location}>
        {React.Children.map(children, (child) =>
          enhanceRouteWithProps(child, { initialData })
        )}
      </Switch>
    );
  }
}

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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(PreloadSwitch);
