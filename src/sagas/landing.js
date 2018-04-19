import { put, takeEvery } from 'redux-saga/effects';
import { combine } from './utils/effects';

import {
  LAST_COMMENTS_REQUEST,
  LAST_COMMENTS_SUCCESS,
  NEW_COMPANIES_REQUEST,
  NEW_COMPANIES_SUCCESS,
} from 'consts/landing';
import apiRequest from './utils/apiRequest';

function* getLastComments() {
  try {
    const payload = yield apiRequest(`/lastComments`);
    const newAction = { type: LAST_COMMENTS_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
  }
}

function* getLastCommentsSaga() {
  yield takeEvery(LAST_COMMENTS_REQUEST, getLastComments);
}

function* getNewCompanies() {
  try {
    const payload = yield apiRequest(`/newCompanies`);
    const newAction = { type: NEW_COMPANIES_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
  }
}

function* getNewCompaniesSaga() {
  yield takeEvery(NEW_COMPANIES_REQUEST, getNewCompanies);
}

export default combine([getLastCommentsSaga, getNewCompaniesSaga]);
