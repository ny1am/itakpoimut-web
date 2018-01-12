import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import request from 'utils/request';
import { API_ROOT, DEFERRED, TOKEN } from 'constants';
import {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE,
  LOGOUT,
} from 'constants/auth';
import { saveAuth } from '../store/storage';

function* auth({ username, password, [DEFERRED]: deferred }) {
  try {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    const url = `${API_ROOT}/login`;
    const requestParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      [TOKEN]: true,
    };
    const payload = yield call(request, url, requestParams);
    const newAction = { type: AUTH_SUCCESS, payload };
    saveAuth(payload);
    yield put(newAction);
    deferred.resolve(newAction);
  } catch (e) {
    const newAction = { type: AUTH_FAILURE };
    saveAuth(null);
    yield put(newAction);
    deferred.reject(e);
  }
}

function* authSaga() {
  yield takeEvery(AUTH_REQUEST, auth);
}

function* logoutSaga() {
  yield takeEvery(LOGOUT, saveAuth);
}

function* authSagas() {
  yield all([
    fork(authSaga),
    fork(logoutSaga),
  ]);
}

export default authSagas;
