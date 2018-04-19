import { put } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
} from 'consts/changePassword';
import { takeFirst } from './utils/effects';
import apiSecureRequest from './utils/apiSecureRequest';

function* saveData({ password, newPassword }) {
  const url = `/changePassword`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: queryString.stringify({ password, newPassword }),
  };
  try {
    const payload = yield apiSecureRequest(url, options);
    const newAction = { type: CHANGE_PASSWORD_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
  }
}

function* changePasswordSaga() {
  yield takeFirst(CHANGE_PASSWORD_REQUEST, saveData);
}

export default changePasswordSaga;
