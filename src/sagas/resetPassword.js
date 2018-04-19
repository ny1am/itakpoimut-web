import { put } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from 'consts/resetPassword';
import { takeFirst } from './utils/effects';
import apiRequest from './utils/apiRequest';

function* resetPassword({ password, token }) {
  const url = `/reset`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: queryString.stringify({ password, token }),
  };
  try {
    const payload = yield apiRequest(url, options);
    const newAction = { type: RESET_PASSWORD_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
  }
}

function* resetPasswordSaga() {
  yield takeFirst(RESET_PASSWORD_REQUEST, resetPassword);
}

export default resetPasswordSaga;
