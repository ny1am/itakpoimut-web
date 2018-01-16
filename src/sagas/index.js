import { combine } from './utils/effects';
import landingSaga from './landing';
import autocompleteSaga from './autocomplete';
import addCategorySaga from './addCategory';
import addViolationSaga from './addViolation';
import companiesSaga from './companies';
import companySaga from './company';
import commentsSaga from './comments';
import createCompanySaga from './createCompany';
import userProfileSaga from './userProfile';
import signupSaga from './signup';
import authSaga from './auth';

export default combine([
  landingSaga,
  autocompleteSaga,
  addCategorySaga,
  addViolationSaga,
  companiesSaga,
  companySaga,
  commentsSaga,
  createCompanySaga,
  userProfileSaga,
  signupSaga,
  authSaga,
]);
