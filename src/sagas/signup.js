import { call, put, takeEvery } from 'redux-saga/effects';

import request from 'utils/request';
import { API_ROOT, DEFERRED, TOKEN } from 'constants';
import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS,
} from 'constants/signup';

function* saveData({ fname, lname, email, password, [DEFERRED]: deferred }) {
  try {
    const body = new URLSearchParams();
    body.set('fname', fname);
    body.set('lname', lname);
    body.set('email', email);
    body.set('password', password);
    const url = `${API_ROOT}/signup`;
    const requestParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      [TOKEN]: true,
    };
    const payload = yield call(request, url, requestParams);
    const newAction = { type: SIGNUP_SUCCESS, payload };
    yield put(newAction);
    deferred.resolve(newAction);
  } catch (e) {
    //do nothing; todo: error handling
    deferred.reject(e);
  }
}

function* signupSaga() {
  yield takeEvery(SIGNUP_REQUEST, saveData);
}

export default signupSaga;
