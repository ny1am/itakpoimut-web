import { put } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  ADD_CATEGORY_SAVE_REQUEST, ADD_CATEGORY_SAVE_SUCCESS,
} from 'constants/addCategory';
import { takeFirst } from './utils/effects';
import apiSecureRequest from './utils/apiSecureRequest';

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

function* saveAddCategorySaga() {
  yield takeFirst(ADD_CATEGORY_SAVE_REQUEST, saveAddCategory);
}

export default saveAddCategorySaga;
