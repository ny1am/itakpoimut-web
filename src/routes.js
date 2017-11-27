import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import SecureRoute from 'utils/SecureRoute';
import LandingPage from 'views/LandingPage';
import CompanyPage from 'views/CompanyPage';
import CompaniesPage from 'views/CompaniesPage';
import UserProfilePage from 'views/UserProfilePage';
import AboutPage from 'views/AboutPage';
import NotFoundPage from 'views/NotFoundPage';

import PreloadWrapper from 'components/PreloadWrapper';

export const routeConfig = [{
  path: '/',
  exact: true,
  component: LandingPage,
}, {
  path: '/company/:id',
  component: CompanyPage,
}, {
  path: '/companies',
  component: CompaniesPage,
}, {
  path: '/userProfile',
  component: UserProfilePage,
  secure: true,
}, {
  path: '/about',
  component: AboutPage,
}];

const Routes = ({ store }) => {
  return (
    <PreloadWrapper store={store}>
      <Switch>
        {routeConfig.map((cfg, index) => {
          const RouteComponent = cfg.secure ? SecureRoute : Route;
          return (
            <RouteComponent key={index} {...cfg} />
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
