import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import SecureRoute from 'utils/SecureRoute';
import PreloadWrapper from 'components/PreloadWrapper';

import routeConfig from './routeConfig';

const Routes = ({ store }) => {
  return (
    <PreloadWrapper store={store}>
      {routeConfig.map(cfg => {
        const RouteComponent = cfg.secure ? SecureRoute : Route;
        return <RouteComponent key={cfg.path} {...cfg} />;
      })}
    </PreloadWrapper>
  );
};

Routes.propTypes = {
  /**
   * store
   */
  store: PropTypes.object,
};

export default Routes;
