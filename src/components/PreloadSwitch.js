import React from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';

import * as preload from 'actions/preload';
import { appReady } from 'actions/global';
import { routeConfig } from 'components/Routes';
import { reactRouterFetch, hasPageLocationChanged } from 'utils';

const extractData = (data) => {
  if (!data) {
    return null;
  } else if (data instanceof Array) {
    return data.reduce((result, requestData) => {
      return Object.assign({}, result, requestData.payload);
    }, {});
  } else {
    return data.payload;
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
    if (hasPageLocationChanged(this.props.location, nextProps.location)) {
      this.fetchRoutes(nextProps, this.props.location);
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
      initialData: null,
    });
    const promise = reactRouterFetch(routeConfig, location, { store, dispatch: store.dispatch, prevLocation });
    const preloadOpts = {
      preloadType: 'page',
      instant: !promise,
      prevRoute: this.props.location.pathname,
      route: props.location.pathname,
      hash: props.location.hash,
    };
    store.dispatch(preload.start(preloadOpts));
    (promise || Promise.resolve()).then((data) => {
      store.dispatch(preload.end(preloadOpts));
      const initialData = extractData((data&&data[0])?data[0]:null);
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
   * history object
   */
  history: PropTypes.object.isRequired,
  /**
   * children
   */
  children: PropTypes.node,
};

export default withRouter(PreloadSwitch);
