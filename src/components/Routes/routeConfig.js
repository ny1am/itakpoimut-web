import LandingPage from 'views/LandingPage';
import CompanyPage from 'views/CompanyPage';
import CompaniesPage from 'views/CompaniesPage';
import UserProfilePage from 'views/UserProfilePage';
import AboutPage from 'views/AboutPage';
import NotFoundPage from 'views/NotFoundPage';
import SomethingWrongPage from 'views/SomethingWrongPage';

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
  path: '/userProfile',
  component: UserProfilePage,
  secure: true,
}, {
  path: '/about',
  component: AboutPage,
}, {
  path: '/oops',
  component: SomethingWrongPage,
}, {
  path: '*',
  component: NotFoundPage,
}];

export default routeConfig;
