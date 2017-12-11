import React from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

import * as preload from 'actions/preload';
import { appReady } from 'actions/global';
import { routeConfig } from 'components/Routes';


function reactRouterFetch (routes, location, options) {
  const branch = matchRoutes(routes, location.pathname);
  if (branch.length > 0) {
    const promises = branch
      .filter(({ route }) => route.component && route.component.fetch)
      .map(({ route, match }) => {
        return route.component.fetch(match, location, options);
      });
    if (promises && promises.length > 0) {
      return Promise.all(promises);
    } else {
      return null;
    }
  } else {
    return null;
  }
}

class PreloadWrapper extends React.Component {

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
    this.fetchRoutes(this.props);
  }

  componentWillReceiveProps (nextProps) {
    const current = `${this.props.location.pathname}${this.props.location.search}`;
    const next = `${nextProps.location.pathname}${nextProps.location.search}`;
    if (current === next) {
     return;
    }
    this.fetchRoutes(nextProps);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !nextState.isAppFetching;
  }

  fetchRoutes (props) {
    const { store, location } = props;
    this.setState({
      isAppFetching: true,
      appFetchingError: null,
      initialData: null,
    });
    const promise = reactRouterFetch(routeConfig, location, { store, dispatch: store.dispatch });
    const preloadOpts = {
      preloadType: 'page',
      instant: !promise,
      prevPathname: this.props.location.pathname,
      pathname: props.location.pathname
    };
    store.dispatch(preload.start(preloadOpts));
    (promise || Promise.resolve()).then((data) => {
      store.dispatch(preload.end(preloadOpts));
      const initialData = data ? data[0].payload : null;
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
    });
  }
  render () {
    if (!this.state.ready) {
      return null;
    }
    const children = React.Children.map(this.props.children, child => {
      const ViewComponent = child.props.component;
      return React.cloneElement(child, {
        component: null,
        render: (props) => (<ViewComponent {...props} initialData={this.state.initialData} />)
      });
    });

    return React.createElement(Switch, null, children);
  }
}

PreloadWrapper.propTypes = {
  /**
   * location object
   */
  location: PropTypes.object.isRequired,
  /**
   * redux store object
   */
  store: PropTypes.object.isRequired,
  /**
   * children
   */
  children: PropTypes.node,
};

export default withRouter(PreloadWrapper);
