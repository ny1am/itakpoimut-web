import React from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';

import * as preload from 'actions/preload';
import { appReady } from 'actions/global';
import { routeConfig } from 'components/Routes';
import {
  reactRouterFetch, hasPageLocationChanged, extractFetchData
} from 'utils';
import { wrapPromise as wrapPromiseWithProgress } from 'components/ProgressBar';

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
    const promise = reactRouterFetch(routeConfig, location, opts);
    const preloadOpts = {
      prevRoute: this.props.location.pathname,
      route: props.location.pathname,
      hash: props.location.hash,
    };
    store.dispatch(preload.start(preloadOpts));
    wrapPromiseWithProgress(promise || Promise.resolve()).then((data) => {
      const initialData = extractFetchData((data&&data[0])?data[0]:null);
      this.setState({
        isAppFetching: false,
        initialData,
        ready: true,
      });
      store.dispatch(appReady());
    })
    .catch((err) => {
      this.setState({
        isAppFetching: false,
        ready: true,
        appFetchingError: err
      });
    }).finally(() => {
      store.dispatch(preload.end(preloadOpts));
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
