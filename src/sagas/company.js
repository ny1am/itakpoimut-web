import { put, select, takeEvery } from 'redux-saga/effects';

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
  return payload;
}

function* getCachedCompany({ id }) {
  const company = yield select(state => {
    return state.company[id];
  });
  if (company) {
    const newAction = { type: COMPANY_SUCCESS, payload: company, cached: true };
    yield put(newAction);
  }
  return company;
}

function* getCompany({ id }) {
  const company = yield getCachedCompany({ id });
  if (!company) {
    return yield fetchCompany({ id });
  }
  return company;
}

function* fetchCompanySaga() {
  yield takeEvery(COMPANY_REQUEST, getCompany);
}

export default fetchCompanySaga;
