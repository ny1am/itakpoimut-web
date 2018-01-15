import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import queryString from 'query-string';

import takeFirst from 'utils/takeFirst';
import { secureRequest } from 'utils/request';
import {
  ADD_CATEGORY_DATA_REQUEST, ADD_CATEGORY_DATA_SUCCESS,
  ADD_CATEGORY_SAVE_REQUEST, ADD_CATEGORY_SAVE_SUCCESS,
} from 'constants/addCategory';

function* fetchData({ companyId }) {
  const url = `/addCategory?company_id=${companyId}`;
  try {
    const payload = yield call(secureRequest, url);
    const newAction = { type: ADD_CATEGORY_DATA_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* saveData({ companyId, selectedCategories }) {
  const url = `/addCategory`;
  const params = {
    'company_id': companyId,
    'selectedCategories[]': selectedCategories,
  };
  try {
    const payload = yield call(secureRequest, url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: queryString.stringify(params),
    });
    const newAction = { type: ADD_CATEGORY_SAVE_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* fetchDataSaga() {
  yield takeEvery(ADD_CATEGORY_DATA_REQUEST, fetchData);
}

function* saveDataSaga() {
  yield takeFirst(ADD_CATEGORY_SAVE_REQUEST, saveData);
}

function* addCategorySaga() {
  yield all([
    fork(fetchDataSaga),
    fork(saveDataSaga),
  ]);
}

export default addCategorySaga;
