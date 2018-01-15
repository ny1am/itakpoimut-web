import { call, put, takeEvery } from 'redux-saga/effects';
import queryString from 'query-string';

import request from 'utils/request';
import {
  COMPANIES_REQUEST, COMPANIES_SUCCESS,
} from 'constants/companies';
import { requestError } from 'actions/global';

function* fetchData({ currentPage, sortOrder, title, filters }) {
  const urlParams = Object.assign({}, {
    currentPage,
    sortOrder,
    title,
  }, filters);
  const url = `/companies?${queryString.stringify(urlParams)}`;
  try {
    const payload = yield call(request, url);
    const newAction = { type: COMPANIES_SUCCESS, payload };
    yield put(newAction);
  } catch (error) {
    yield put(requestError(error));
  }
}

function* companiesSaga() {
  yield takeEvery(COMPANIES_REQUEST, fetchData);
}

export default companiesSaga;
