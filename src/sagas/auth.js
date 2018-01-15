import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import queryString from 'query-string';

import request from 'utils/request';
import {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE,
  LOGOUT,
} from 'constants/auth';
import { saveAuth } from '../store/storage';

function* auth({ username, password }) {
  const url = `/login`;
  const params = { username, password };
  try {
    const payload = yield call(request, url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: queryString.stringify(params),
    });
    const newAction = { type: AUTH_SUCCESS, payload };
    yield call(saveAuth, payload);
    yield put(newAction);
  } catch (error) {
    const newAction = { type: AUTH_FAILURE, error };
    yield logout();
    yield put(newAction);
  }
}

function* logout() {
  yield call(saveAuth);
}

function* authSaga() {
  yield takeEvery(AUTH_REQUEST, auth);
}

function* logoutSaga() {
  yield takeEvery(LOGOUT, logout);
}

function* authSagas() {
  yield all([
    fork(authSaga),
    fork(logoutSaga),
  ]);
}

export default authSagas;
