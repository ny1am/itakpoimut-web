import PleaseSignupDialog from 'views/PleaseSignupDialog';
import LoginDialog from 'views/LoginDialog';
import SignupDialog from 'views/SignupDialog';
import CreateCompanyDialog from 'views/CreateCompanyDialog';
import AddViolationDialog from 'views/AddViolationDialog';
import AddCategoryDialog from 'views/AddCategoryDialog';
import ChangePasswordDialog from 'views/ChangePasswordDialog';
import ForgetPasswordDialog from 'views/ForgetPasswordDialog';

const routeConfig = [{
  path: '/dialog/please-signup',
  component: PleaseSignupDialog,
}, {
  path: '/dialog/login',
  component: LoginDialog,
}, {
  path: '/dialog/signup',
  component: SignupDialog,
}, {
  path: '/dialog/forget-password',
  component: ForgetPasswordDialog,
}, {
  path: '/dialog/create-company',
  component: CreateCompanyDialog,
  secure: true,
}, {
  path: '/dialog/add-violation/:companyId',
  component: AddViolationDialog,
  secure: true,
}, {
  path: '/dialog/add-category/:companyId',
  component: AddCategoryDialog,
  secure: true,
}, {
  path: '/dialog/change-password',
  component: ChangePasswordDialog,
  secure: true,
}];

export default routeConfig;
