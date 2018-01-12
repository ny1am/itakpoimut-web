import { fork, all } from 'redux-saga/effects';

import landingSaga from './landing';
import autocompleteSaga from './autocomplete';
import addCategorySaga from './addCategory';
import addViolationSaga from './addViolation';
import companiesSaga from './companies';
import companySaga from './company';
import createCompanySaga from './createCompany';
import userProfileSaga from './userProfile';
import signupSaga from './signup';
import authSaga from './auth';

export default function* rootSaga() {
  yield all([
    fork(landingSaga),
    fork(autocompleteSaga),
    fork(addCategorySaga),
    fork(addViolationSaga),
    fork(companiesSaga),
    fork(companySaga),
    fork(createCompanySaga),
    fork(userProfileSaga),
    fork(signupSaga),
    fork(authSaga),
  ]);
}
