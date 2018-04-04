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
}, {
  path: '/signup',
  component: SignupDialog,
}, {
  path: '/forget-password',
  component: ForgetPasswordDialog,
}, {
  path: '/create-company',
  component: CreateCompanyDialog,
  secure: true,
}, {
  path: '/add-violation/:companyId',
  component: AddViolationDialog,
  secure: true,
}, {
  path: '/add-category/:companyId',
  component: AddCategoryDialog,
  secure: true,
}, {
  path: '/change-password',
  component: ChangePasswordDialog,
  secure: true,
}];

export default routeConfig;
