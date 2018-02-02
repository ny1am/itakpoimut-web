import { put, takeEvery } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  COMPANIES_REQUEST, COMPANIES_SUCCESS,
} from 'consts/companies';
import apiRequest from './utils/apiRequest';

function* fetchData({ currentPage, sortOrder, title, filters }) {
  const urlParams = Object.assign({}, {
    currentPage,
    sortOrder,
    title,
  }, filters);
  const url = `/companies?${queryString.stringify(urlParams)}`;
  const { payload } = yield apiRequest(url);
  if (payload) {
    const newAction = { type: COMPANIES_SUCCESS, payload };
    yield put(newAction);
  }
}

function* companiesSaga() {
  yield takeEvery(COMPANIES_REQUEST, fetchData);
}

export default companiesSaga;
