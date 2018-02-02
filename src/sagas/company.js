import { put, select, takeEvery } from 'redux-saga/effects';

import {
  FETCH_COMPANY_SUCCESS,
  GET_COMPANY, GET_COMPANY_SUCCESS,
} from 'consts/company';
import apiRequest from './utils/apiRequest';

function* fetchCompany({ id }) {
  const { payload } = yield apiRequest(`/company/${id}`);
  if (payload) {
    const newAction = { type: FETCH_COMPANY_SUCCESS, payload };
    yield put(newAction);
  }
  return payload;
}

function* getCachedCompany({ id }) {
  const company = yield select(state => {
    return state.company[id];
  });
  return company;
}

function* getCompany({ id }) {
  let company = yield getCachedCompany({ id });
  if (!company) {
    company = yield fetchCompany({ id });
  }
  if (company) {
    const newAction = { type: GET_COMPANY_SUCCESS, payload: company };
    yield put(newAction);
  }
  return company;
}

function* getCompanySaga() {
  yield takeEvery(GET_COMPANY, getCompany);
}

export default getCompanySaga;
