import { put, takeEvery, select } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  COMPANIES_REQUEST, COMPANIES_SUCCESS,
} from 'consts/companies';
import apiRequest from './utils/apiRequest';

const filtersSelector = (state) => state.companies;

function* fetchData({ currentPage, sortOrder, title }) {
  const filters = yield select(filtersSelector);
  const urlParams = Object.assign({}, {
    currentPage,
    sortOrder,
    title,
  }, filters);
  const url = `/companies?${queryString.stringify(urlParams)}`;
  try {
    const payload = yield apiRequest(url);
    const newAction = { type: COMPANIES_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
  }
}

function* companiesSaga() {
  yield takeEvery(COMPANIES_REQUEST, fetchData);
}

export default companiesSaga;
