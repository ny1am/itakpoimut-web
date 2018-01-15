import { call, put, takeEvery } from 'redux-saga/effects';
import queryString from 'query-string';

import request from 'utils/request';
import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS,
} from 'constants/signup';
import { requestError } from 'actions/global';

function* saveData({ fname, lname, email, password }) {
  const url = `/signup`;
  const params = { fname, lname, email, password };
  try {
    const payload = yield call(request, url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: queryString.stringify(params),
    });
    const newAction = { type: SIGNUP_SUCCESS, payload };
    yield put(newAction);
  } catch (error) {
    yield put(requestError(error));
  }
}

function* signupSaga() {
  yield takeEvery(SIGNUP_REQUEST, saveData);
}

export default signupSaga;
