import { call, put, takeEvery } from 'redux-saga/effects';

import request from 'utils/request';
import {
  LANDING_REQUEST, LANDING_SUCCESS,
} from 'constants/landing';
import { requestError } from 'actions/global';

function* fetchData() {
  try {
    const payload = yield call(request, `/`);
    const newAction = { type: LANDING_SUCCESS, payload };
    yield put(newAction);
  } catch (error) {
    yield put(requestError(error));
  }
}

function* landingSaga() {
  yield takeEvery(LANDING_REQUEST, fetchData);
}

export default landingSaga;
