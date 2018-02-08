import PleaseSignupDialog from 'views/PleaseSignupDialog';
import SuccessDialog from 'views/SuccessDialog';
import LoginDialog from 'views/LoginDialog';
import SignupDialog from 'views/SignupDialog';
import CreateCompanyDialog from 'views/CreateCompanyDialog';
import AddViolationDialog from 'views/AddViolationDialog';
import AddCategoryDialog from 'views/AddCategoryDialog';
import ChangePasswordDialog from 'views/ChangePasswordDialog';
import { LOGIN_DIALOG, SIGNUP_DIALOG, PLEASE_SIGNUP_DIALOG, CREATE_COMPANY_DIALOG, ADD_VIOLATION_DIALOG, ADD_CATEGORY_DIALOG, SUCCESS_DIALOG, CHANGE_PASSWORD_DIALOG } from 'consts/dialog';

const routeConfig = [{
  path: PLEASE_SIGNUP_DIALOG,
  component: PleaseSignupDialog,
}, {
  path: SUCCESS_DIALOG,
  component: SuccessDialog,
}, {
  path: LOGIN_DIALOG,
  component: LoginDialog,
}, {
  path: SIGNUP_DIALOG,
  component: SignupDialog,
}, {
  path: CREATE_COMPANY_DIALOG,
  component: CreateCompanyDialog,
  secure: true,
}, {
  path: ADD_VIOLATION_DIALOG,
  component: AddViolationDialog,
  secure: true,
}, {
  path: ADD_CATEGORY_DIALOG,
  component: AddCategoryDialog,
  secure: true,
}, {
  path: CHANGE_PASSWORD_DIALOG,
  component: ChangePasswordDialog,
  secure: true,
}];

export default routeConfig;
