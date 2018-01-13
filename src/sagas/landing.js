import { call, put, takeEvery } from 'redux-saga/effects';

import request from 'utils/request';
import { API_ROOT } from 'constants';
import {
  LANDING_REQUEST, LANDING_SUCCESS,
} from 'constants/landing';

function* fetchData() {
  try {
    const payload = yield call(request, `${API_ROOT}/`);
    const newAction = { type: LANDING_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //todo: error handling
  }
}

function* landingSaga() {
  yield takeEvery(LANDING_REQUEST, fetchData);
}

export default landingSaga;