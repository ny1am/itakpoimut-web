import { call, put, takeEvery } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE,
  LOGOUT,
} from 'constants/auth';
import { saveAuth } from '../store/storage';
import { combine, takeFirst } from './utils/effects';
import apiRequest from './utils/apiRequest';

function* auth({ username, password }) {
  const url = `/login`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: queryString.stringify({ username, password }),
  };
  const { payload, error } = yield apiRequest(url, options);
  if (payload) {
    const newAction = { type: AUTH_SUCCESS, payload };
    yield call(saveAuth, payload);
    yield put(newAction);
  } else {
    const newAction = { type: AUTH_FAILURE, error };
    yield logout();
    yield put(newAction);
  }
}

function* logout() {
  yield call(saveAuth, null);
}

function* authSaga() {
  yield takeFirst(AUTH_REQUEST, auth);
}

function* logoutSaga() {
  yield takeEvery(LOGOUT, logout);
}

export default combine([
  authSaga,
  logoutSaga,
]);
