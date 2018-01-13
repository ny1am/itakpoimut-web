import { call, put, takeEvery } from 'redux-saga/effects';
import queryString from 'query-string';

import request from 'utils/request';
import { API_ROOT } from 'constants';
import {
  AUTOCOMPLETE_REQUEST, AUTOCOMPLETE_SUCCESS
} from 'constants/autocomplete';

function* fetchData({ title, category }) {
  try {
    const params = { title, category };
    const url = `${API_ROOT}/autocomplete?${queryString.stringify(params)}`;
    const payload = yield call(request, url);
    const newAction = { type: AUTOCOMPLETE_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* autocompleteSaga() {
  yield takeEvery(AUTOCOMPLETE_REQUEST, fetchData);
}

export default autocompleteSaga;
