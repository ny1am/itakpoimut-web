import { call, put, takeEvery, fork, all } from 'redux-saga/effects';

import request from 'utils/request';
import { API_ROOT, TOKEN } from 'constants';
import {
  ADD_VIOLATION_DATA_REQUEST, ADD_VIOLATION_DATA_SUCCESS,
  ADD_VIOLATION_SAVE_REQUEST, ADD_VIOLATION_SAVE_SUCCESS,
} from 'constants/addViolation';

function* fetchData({ companyId }) {
  try {
    const url = `${API_ROOT}/addViolation?company_id=${companyId}`;
    const requestParams = {
      [TOKEN]: true,
    };
    const payload = yield call(request, url, requestParams);
    const newAction = { type: ADD_VIOLATION_DATA_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* saveData({ companyId, selectedViolations }) {
  try {
    const body = new URLSearchParams();
    body.append('company_id', companyId);
    selectedViolations.forEach(violation => {
      body.append('selectedViolations[]', violation);
    });
    const url = `${API_ROOT}/addViolation`;
    const requestParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      [TOKEN]: true,
    };
    const payload = yield call(request, url, requestParams);
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
