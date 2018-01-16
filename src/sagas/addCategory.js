import { put, takeEvery } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  ADD_CATEGORY_DATA_REQUEST, ADD_CATEGORY_DATA_SUCCESS,
  ADD_CATEGORY_SAVE_REQUEST, ADD_CATEGORY_SAVE_SUCCESS,
} from 'constants/addCategory';
import { combine, takeFirst } from './utils/effects';
import apiSecureRequest from './utils/apiSecureRequest';

function* fetchAddCategory({ companyId }) {
  const url = `/addCategory?company_id=${companyId}`;
  const { payload } = yield apiSecureRequest(url);
  if (payload) {
    const newAction = { type: ADD_CATEGORY_DATA_SUCCESS, payload };
    yield put(newAction);
  }
}

function* saveAddCategory({ companyId, selectedCategories }) {
  const url = `/addCategory`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: queryString.stringify({
      'company_id': companyId,
      'selectedCategories[]': selectedCategories,
    }),
  };
  const { payload } = yield apiSecureRequest(url, options);
  if (payload) {
    const newAction = { type: ADD_CATEGORY_SAVE_SUCCESS, payload };
    yield put(newAction);
  }
}

function* fetchAddCategorySaga() {
  yield takeEvery(ADD_CATEGORY_DATA_REQUEST, fetchAddCategory);
}

function* saveAddCategorySaga() {
  yield takeFirst(ADD_CATEGORY_SAVE_REQUEST, saveAddCategory);
}

export default combine([
  fetchAddCategorySaga,
  saveAddCategorySaga,
]);
