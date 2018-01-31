import React from 'react';
import { Route } from 'react-router-dom';

import PreloadSwitch from 'components/PreloadSwitch';

import SecureRoute from './SecureRoute';
import routeConfig from './routeConfig';

class Routes extends React.Component {

  render() {
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
