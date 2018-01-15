import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import toFormData from 'object-to-formdata';

import takeFirst from 'utils/takeFirst';
import { secureRequest } from 'utils/request';
import {
  CREATE_COMPANY_DATA_REQUEST, CREATE_COMPANY_DATA_SUCCESS,
  CREATE_COMPANY_SAVE_REQUEST, CREATE_COMPANY_SAVE_SUCCESS,
} from 'constants/createCompany';

function* fetchData() {
  try {
    const payload = yield call(secureRequest, `/createCompany`);
    const newAction = { type: CREATE_COMPANY_DATA_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* saveData({ title, description, company_site, selectedCategories, selectedViolations, attachment }) {
  const url = `/createCompany`;
  const params = {
    title, description, company_site, attachment,
    'selectedCategories[]': selectedCategories,
    'selectedViolations[]': selectedViolations,
  };
  try {
    const payload = yield call(secureRequest, url, {
      method: 'POST',
      body: toFormData(params),
    });
    const newAction = { type: CREATE_COMPANY_SAVE_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* fetchDataSaga() {
  yield takeEvery(CREATE_COMPANY_DATA_REQUEST, fetchData);
}

function* saveDataSaga() {
  yield takeFirst(CREATE_COMPANY_SAVE_REQUEST, saveData);
}

function* createCompanySaga() {
  yield all([
    fork(fetchDataSaga),
    fork(saveDataSaga),
  ]);
}

export default createCompanySaga;
