import { combine } from './utils/effects';
import landingSaga from './landing';
import categorySaga from './category';
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
  categorySaga,
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
