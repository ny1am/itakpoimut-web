import { put, takeEvery } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  ADD_VIOLATION_DATA_REQUEST, ADD_VIOLATION_DATA_SUCCESS,
  ADD_VIOLATION_SAVE_REQUEST, ADD_VIOLATION_SAVE_SUCCESS
} from 'constants/addViolation';
import { combine, takeFirst } from './utils/effects';
import apiSecureRequest from './utils/apiSecureRequest';

function* fetchAddViolation({ companyId }) {
  const url = `/addViolation?company_id=${companyId}`;
  const { payload } = yield apiSecureRequest(url);
  if (payload) {
    const newAction = { type: ADD_VIOLATION_DATA_SUCCESS, payload };
    yield put(newAction);
  }
}

function* saveAddViolation({ companyId, selectedViolations }) {
  const url = `/addViolation`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: queryString.stringify({
      'company_id': companyId,
      'selectedViolations[]': selectedViolations,
    }),
  };
  const { payload } = yield apiSecureRequest(url, options);
  if (payload) {
    const newAction = { type: ADD_VIOLATION_SAVE_SUCCESS, payload };
    yield put(newAction);
  }
}

function* fetchAddViolationSaga() {
  yield takeEvery(ADD_VIOLATION_DATA_REQUEST, fetchAddViolation);
}

function* saveAddViolationSaga() {
  yield takeFirst(ADD_VIOLATION_SAVE_REQUEST, saveAddViolation);
}

export default combine([
  fetchAddViolationSaga,
  saveAddViolationSaga,
]);
