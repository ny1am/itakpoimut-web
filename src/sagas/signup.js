import { put } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS,
} from 'consts/signup';
import { takeFirst } from './utils/effects';
import apiRequest from './utils/apiRequest';

function* signup({ fname, lname, email, password }) {
  const url = `/signup`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: queryString.stringify({ fname, lname, email, password }),
  };
  try {
    const payload = yield apiRequest(url, options);
    const newAction = { type: SIGNUP_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
  }
}

function* signupSaga() {
  yield takeFirst(SIGNUP_REQUEST, signup);
}

export default signupSaga;
