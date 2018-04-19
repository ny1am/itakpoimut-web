import { put } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
} from 'consts/forgetPassword';
import { takeFirst } from './utils/effects';
import apiRequest from './utils/apiRequest';

function* forgetPassword({ email }) {
  const url = `/forgot`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: queryString.stringify({ email }),
  };
  try {
    const payload = yield apiRequest(url, options);
    const newAction = { type: FORGET_PASSWORD_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
  }
}

function* forgetPasswordSaga() {
  yield takeFirst(FORGET_PASSWORD_REQUEST, forgetPassword);
}

export default forgetPasswordSaga;
