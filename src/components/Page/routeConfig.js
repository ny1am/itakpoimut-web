import { loggedUserCheck, notLoggedUserCheck } from 'utils/secure';

import LandingPage from 'views/LandingPage';
import CompanyPage from 'views/CompanyPage';
import CompaniesPage from 'views/CompaniesPage';
import UserProfilePage from 'views/UserProfilePage';
import AboutPage from 'views/AboutPage';
import ResetPasswordPage from 'views/ResetPasswordPage';

const routeConfig = [{
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
  path: '/user-profile',
  component: UserProfilePage,
  secure: loggedUserCheck,
}, {
  path: '/about',
  component: AboutPage,
}, {
  path: '/reset/:token',
  component: ResetPasswordPage,
  secure: notLoggedUserCheck,
}];

export default routeConfig;
