import { call, put, takeEvery } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  AUTH_REQUEST, FB_AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE,
  LOGOUT,
} from 'consts/auth';
import { saveAuth } from '../store/storage';
import { combine, takeFirst } from './utils/effects';
import apiRequest from './utils/apiRequest';

function* generalAuth(url, options) {
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

function* auth({ username, password }) {
  const url = `/login`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: queryString.stringify({ username, password }),
  };
  yield generalAuth(url, options);
}

function* fbAuth({ accessToken }) {
  const url = `/fb-login`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: queryString.stringify({ socialToken: accessToken }),
  };
  yield generalAuth(url, options);
}

function* logout() {
  yield call(saveAuth, null);
}

function* authSaga() {
  yield takeFirst(AUTH_REQUEST, auth);
}

function* fbAuthSaga() {
  yield takeFirst(FB_AUTH_REQUEST, fbAuth);
}

function* logoutSaga() {
  yield takeEvery(LOGOUT, logout);
}

export default combine([
  authSaga,
  fbAuthSaga,
  logoutSaga,
]);
