import { put, takeEvery } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  AUTOCOMPLETE_REQUEST, AUTOCOMPLETE_SUCCESS
} from 'consts/autocomplete';
import apiRequest from './utils/apiRequest';

function* fetchData({ title, category }) {
  const params = { title, category };
  const url = `/autocomplete?${queryString.stringify(params)}`;
  const { payload } = yield apiRequest(url);
  if (payload) {
    const newAction = { type: AUTOCOMPLETE_SUCCESS, payload };
    yield put(newAction);
  }
}

function* autocompleteSaga() {
  yield takeEvery(AUTOCOMPLETE_REQUEST, fetchData);
}

export default autocompleteSaga;
