import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import LandingPage from 'views/LandingPage';
import NotFoundPage from 'views/NotFoundPage';

import PreloadWrapper from 'components/PreloadWrapper';

export const routeConfig = [{
  path: '/',
  component: LandingPage,
}];

const Routes = ({ store }) => {
  return (
    <PreloadWrapper store={store}>
      <Switch>
        {routeConfig.map((cfg, index) => {
          return (
            <Route key={index} {...cfg} />
          );
        })}
        <Route component={NotFoundPage}/>
      </Switch>
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
