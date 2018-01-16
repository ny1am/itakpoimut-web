import { put, takeEvery } from 'redux-saga/effects';

import {
  LANDING_REQUEST, LANDING_SUCCESS,
} from 'constants/landing';
import apiRequest from './utils/apiRequest';

function* fetchData() {
  const { payload } = yield apiRequest(`/`);
  if (payload) {
    const newAction = { type: LANDING_SUCCESS, payload };
    yield put(newAction);
  }
}

function* landingSaga() {
  yield takeEvery(LANDING_REQUEST, fetchData);
}

export default landingSaga;
