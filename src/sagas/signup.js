import { call, put, takeEvery } from 'redux-saga/effects';

import request from 'utils/request';
import { API_ROOT, TOKEN } from 'constants';
import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS,
} from 'constants/signup';

function* saveData({ fname, lname, email, password }) {
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
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* signupSaga() {
  yield takeEvery(SIGNUP_REQUEST, saveData);
}

export default signupSaga;
