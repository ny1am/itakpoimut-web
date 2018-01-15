import { call, put, takeEvery } from 'redux-saga/effects';

import request from 'utils/request';
import {
  COMPANY_REQUEST, COMPANY_SUCCESS,
} from 'constants/company';

function* fetchData({ id }) {
  try {
    const payload = yield call(request, `/company/${id}`);
    const newAction = { type: COMPANY_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* fetchDataSaga() {
  yield takeEvery(COMPANY_REQUEST, fetchData);
}

export default fetchDataSaga;
