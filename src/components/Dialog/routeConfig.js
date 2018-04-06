import {
  loggedUserCheck, notLoggedUserCheck, userLocalProviderCheck
} from 'utils/secure';

import LoginDialog from 'views/LoginDialog';
import SignupDialog from 'views/SignupDialog';
import CreateCompanyDialog from 'views/CreateCompanyDialog';
import AddViolationDialog from 'views/AddViolationDialog';
import AddCategoryDialog from 'views/AddCategoryDialog';
import ChangePasswordDialog from 'views/ChangePasswordDialog';
import ForgetPasswordDialog from 'views/ForgetPasswordDialog';

const routeConfig = [{
  path: '/login',
  component: LoginDialog,
  secure: notLoggedUserCheck,
}, {
  path: '/signup',
  component: SignupDialog,
  secure: notLoggedUserCheck,
}, {
  path: '/forget-password',
  component: ForgetPasswordDialog,
  secure: notLoggedUserCheck,
}, {
  path: '/create-company',
  component: CreateCompanyDialog,
  secure: loggedUserCheck,
}, {
  path: '/add-violation/:companyId',
  component: AddViolationDialog,
  secure: loggedUserCheck,
}, {
  path: '/add-category/:companyId',
  component: AddCategoryDialog,
  secure: loggedUserCheck,
}, {
  path: '/change-password',
  component: ChangePasswordDialog,
  secure: userLocalProviderCheck,
}];

export default routeConfig;
