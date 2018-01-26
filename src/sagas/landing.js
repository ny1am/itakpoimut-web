import { put, takeEvery } from 'redux-saga/effects';
import { combine } from './utils/effects';

import {
  LAST_COMMENTS_REQUEST, LAST_COMMENTS_SUCCESS,
  NEW_COMPANIES_REQUEST, NEW_COMPANIES_SUCCESS,
} from 'constants/landing';
import apiRequest from './utils/apiRequest';

function* getLastComments() {
  const { payload } = yield apiRequest(`/lastComments`);
  if (payload) {
    const newAction = { type: LAST_COMMENTS_SUCCESS, payload };
    yield put(newAction);
  }
}

function* getLastCommentsSaga() {
  yield takeEvery(LAST_COMMENTS_REQUEST, getLastComments);
}

function* getNewCompanies() {
  const { payload } = yield apiRequest(`/newCompanies`);
  if (payload) {
    const newAction = { type: NEW_COMPANIES_SUCCESS, payload };
    yield put(newAction);
  }
}

function* getNewCompaniesSaga() {
  yield takeEvery(NEW_COMPANIES_REQUEST, getNewCompanies);
}

export default combine([
  getLastCommentsSaga,
  getNewCompaniesSaga,
]);
