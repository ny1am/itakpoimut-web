import { put, takeEvery } from 'redux-saga/effects';

import {
  COMPANY_REQUEST, COMPANY_SUCCESS,
} from 'constants/company';
import apiRequest from './utils/apiRequest';

function* fetchCompany({ id }) {
  const { payload } = yield apiRequest(`/company/${id}`);
  if (payload) {
    const newAction = { type: COMPANY_SUCCESS, payload };
    yield put(newAction);
  }
}

function* fetchCompanySaga() {
  yield takeEvery(COMPANY_REQUEST, fetchCompany);
}

export default fetchCompanySaga;
