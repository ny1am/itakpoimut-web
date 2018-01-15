import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import queryString from 'query-string';

import { secureRequest } from 'utils/request';
import {
  ADD_VIOLATION_DATA_REQUEST, ADD_VIOLATION_DATA_SUCCESS,
  ADD_VIOLATION_SAVE_REQUEST, ADD_VIOLATION_SAVE_SUCCESS,
} from 'constants/addViolation';

function* fetchData({ companyId }) {
  const url = `/addViolation?company_id=${companyId}`;
  try {
    const payload = yield call(secureRequest, url);
    const newAction = { type: ADD_VIOLATION_DATA_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* saveData({ companyId, selectedViolations }) {
  const url = `/addViolation`;
  const params = {
    'company_id': companyId,
    'selectedViolations[]': selectedViolations,
  };
  try {
    const requestParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: queryString.stringify(params),
    };
    const payload = yield call(secureRequest, url, requestParams);
    const newAction = { type: ADD_VIOLATION_SAVE_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* fetchDataSaga() {
  yield takeEvery(ADD_VIOLATION_DATA_REQUEST, fetchData);
}

function* saveDataSaga() {
  yield takeEvery(ADD_VIOLATION_SAVE_REQUEST, saveData);
}

function* addViolationSaga() {
  yield all([
    fork(fetchDataSaga),
    fork(saveDataSaga),
  ]);
}

export default addViolationSaga;
