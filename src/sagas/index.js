import { combine } from './utils/effects';

import preloadSaga from './preload';

import landingSaga from './landing';
import categorySaga from './category';
import violationSaga from './violation';
import autocompleteSaga from './autocomplete';
import addCategorySaga from './addCategory';
import addViolationSaga from './addViolation';
import companiesSaga from './companies';
import companySaga from './company';
import commentsSaga from './comments';
import createCompanySaga from './createCompany';
import userProfileSaga from './userProfile';
import signupSaga from './signup';
import forgetPasswordSaga from './forgetPassword';
import resetPasswordSaga from './resetPassword';
import authSaga from './auth';
import changePasswordSaga from './changePassword';

export default combine([
  preloadSaga,
  landingSaga,
  categorySaga,
  violationSaga,
  autocompleteSaga,
  addCategorySaga,
  addViolationSaga,
  companiesSaga,
  companySaga,
  commentsSaga,
  createCompanySaga,
  userProfileSaga,
  signupSaga,
  forgetPasswordSaga,
  resetPasswordSaga,
  authSaga,
  changePasswordSaga,
]);
