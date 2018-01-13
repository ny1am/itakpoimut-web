import { call, put, takeEvery, fork, all } from 'redux-saga/effects';

import request from 'utils/request';
import { API_ROOT, TOKEN } from 'constants';
import {
  ADD_CATEGORY_DATA_REQUEST, ADD_CATEGORY_DATA_SUCCESS,
  ADD_CATEGORY_SAVE_REQUEST, ADD_CATEGORY_SAVE_SUCCESS,
} from 'constants/addCategory';

function* fetchData({ companyId }) {
  try {
    const url = `${API_ROOT}/addCategory?company_id=${companyId}`;
    const requestParams = {
      [TOKEN]: true,
    };
    const payload = yield call(request, url, requestParams);
    const newAction = { type: ADD_CATEGORY_DATA_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* saveData({ companyId, selectedCategories }) {
  try {
    const body = new URLSearchParams();
    body.append('company_id', companyId);
    selectedCategories.forEach(category => {
      body.append('selectedCategories[]', category);
    });
    const url = `${API_ROOT}/addCategory`;
    const requestParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      [TOKEN]: true,
    };
    const payload = yield call(request, url, requestParams);
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
  yield takeEvery(ADD_CATEGORY_SAVE_REQUEST, saveData);
}

function* addCategorySaga() {
  yield all([
    fork(fetchDataSaga),
    fork(saveDataSaga),
  ]);
}

export default addCategorySaga;
