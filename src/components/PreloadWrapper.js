import React from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

import { PREFETCH_LOCATION_CHANGE } from 'constants';
import { routeConfig } from '../routes';
import Loading from 'components/Loading';

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
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
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
    const current = this.props.location;
    const next = nextProps.location;
    if (current.pathname === next.pathname) {
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
    const prevPathName = this.props.location.pathname;
    const promise = reactRouterFetch(routeConfig, location, { store, dispatch: store.dispatch });
    promise.then((data) => {
      const initialData = data ? data[0].payload : null;
      store.dispatch({type: PREFETCH_LOCATION_CHANGE});
      this.setState({
        isAppFetching: false,
        initialData,
        ready: true,
      });
      //todo: move to middleware or...
      if (prevPathName !== location.pathname) {
        window.scrollTo(0, 0);
      }
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
      return <Loading />;
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
   * children
   */
  children: PropTypes.node,
};

export default withRouter(PreloadWrapper);
