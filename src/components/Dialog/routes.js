import PleaseSignupDialog from 'views/PleaseSignupDialog';
import SuccessDialog from 'views/SuccessDialog';
import LoginDialog from 'views/LoginDialog';
import SignupDialog from 'views/SignupDialog';
import CreateCompanyDialog from 'views/CreateCompanyDialog';
import AddViolationDialog from 'views/AddViolationDialog';
import AddCategoryDialog from 'views/AddCategoryDialog';
import { LOGIN_DIALOG, SIGNUP_DIALOG, PLEASE_SIGNUP_DIALOG, CREATE_COMPANY_DIALOG, ADD_VIOLATION_DIALOG, ADD_CATEGORY_DIALOG, SUCCESS_DIALOG } from 'consts/dialog';

const routes = {
  [PLEASE_SIGNUP_DIALOG]: {
    component: PleaseSignupDialog,
  },
  [SUCCESS_DIALOG]: {
    component: SuccessDialog,
  },

  [LOGIN_DIALOG]: {
    component: LoginDialog,
  },
  [SIGNUP_DIALOG]: {
    component: SignupDialog,
  },
  [CREATE_COMPANY_DIALOG]: {
    component: CreateCompanyDialog,
    secure: true,
  },
  [ADD_VIOLATION_DIALOG]: {
    component: AddViolationDialog,
    secure: true,
  },
  [ADD_CATEGORY_DIALOG]: {
    component: AddCategoryDialog,
    secure: true,
  },
};

export default routes;
