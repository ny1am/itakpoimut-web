import { call, put, takeEvery, fork, all } from 'redux-saga/effects';

import request from 'utils/request';
import { API_ROOT, DEFERRED, TOKEN } from 'constants';
import {
  CREATE_COMPANY_DATA_REQUEST, CREATE_COMPANY_DATA_SUCCESS,
  CREATE_COMPANY_SAVE_REQUEST, CREATE_COMPANY_SAVE_SUCCESS,
} from 'constants/createCompany';

function* fetchData({ [DEFERRED]: deferred }) {
  try {
    const url = `${API_ROOT}/createCompany`;
    const requestParams = {
      [TOKEN]: true,
    };
    const payload = yield call(request, url, requestParams);
    const newAction = { type: CREATE_COMPANY_DATA_SUCCESS, payload };
    yield put(newAction);
    deferred.resolve(newAction);
  } catch (e) {
    //do nothing; todo: error handling
    deferred.reject(e);
  }
}

function* saveData({ title, description, company_site, selectedCategories, selectedViolations, attachment, [DEFERRED]: deferred }) {
  try {
    const body = new FormData();
    body.append('title', title);
    body.append('description', description);
    body.append('company_site', company_site);
    selectedCategories.forEach(category => {
      body.append('selectedCategories[]', category.value);
    });
    selectedViolations.forEach(violation => {
      body.append('selectedViolations[]', violation.value);
    });
    body.append('attachment', attachment);
    const url = `${API_ROOT}/createCompany`;
    const requestParams = {
      method: 'POST',
      body,
      [TOKEN]: true,
    };
    const payload = yield call(request, url, requestParams);
    const newAction = { type: CREATE_COMPANY_SAVE_SUCCESS, payload };
    yield put(newAction);
    deferred.resolve(newAction);
  } catch (e) {
    //do nothing; todo: error handling
    deferred.reject(e);
  }
}

function* fetchDataSaga() {
  yield takeEvery(CREATE_COMPANY_DATA_REQUEST, fetchData);
}

function* saveDataSaga() {
  yield takeEvery(CREATE_COMPANY_SAVE_REQUEST, saveData);
}

function* createCompanySaga() {
  yield all([
    fork(fetchDataSaga),
    fork(saveDataSaga),
  ]);
}

export default createCompanySaga;
