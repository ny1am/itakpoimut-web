import { put, takeEvery } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  AUTOCOMPLETE_REQUEST,
  AUTOCOMPLETE_SUCCESS,
} from 'consts/autocomplete';
import apiRequest from './utils/apiRequest';

function* fetchData({ title, category }) {
  const params = { title, category };
  const url = `/autocomplete?${queryString.stringify(params)}`;
  try {
    const payload = yield apiRequest(url);
    const newAction = { type: AUTOCOMPLETE_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
  }
}

function* autocompleteSaga() {
  yield takeEvery(AUTOCOMPLETE_REQUEST, fetchData);
}

export default autocompleteSaga;
