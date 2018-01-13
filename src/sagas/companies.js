import { call, put, takeEvery } from 'redux-saga/effects';
import queryString from 'query-string';

import request from 'utils/request';
import { API_ROOT } from 'constants';
import {
  COMPANIES_REQUEST, COMPANIES_SUCCESS,
} from 'constants/companies';

function* fetchData({ currentPage, sortOrder, title, filters }) {
  try {
    const url = `${API_ROOT}/companies?currentPage=${currentPage}&sortOrder=${sortOrder}&title=${title}&${queryString.stringify(filters)}`;
    const payload = yield call(request, url);
    const newAction = { type: COMPANIES_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* companiesSaga() {
  yield takeEvery(COMPANIES_REQUEST, fetchData);
}

export default companiesSaga;
