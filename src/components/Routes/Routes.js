import React from 'react';
import { Route } from 'react-router-dom';

import PreloadSwitch from 'components/PreloadSwitch';
import NotFoundPage from 'views/NotFoundPage';

import SecureRoute from './SecureRoute';
import routeConfig from './routeConfig';

class Routes extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentWillReceiveProps() {
    this.setState({ hasError: false });
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <NotFoundPage />;
    }
    return (
      <PreloadSwitch>
        {routeConfig.map(cfg => {
          const RouteComponent = cfg.secure ? SecureRoute : Route;
          return <RouteComponent key={cfg.path} {...cfg} />;
        })}
      </PreloadSwitch>
    );
  }
}

export default Routes;
