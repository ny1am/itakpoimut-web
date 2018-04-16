import { put } from 'redux-saga/effects';
import queryString from 'query-string';

import {
  ADD_VIOLATION_SAVE_REQUEST, ADD_VIOLATION_SAVE_SUCCESS
} from 'consts/addViolation';
import { takeFirst } from './utils/effects';
import apiSecureRequest from './utils/apiSecureRequest';

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
  try {
    const payload = yield apiSecureRequest(url, options);
    const newAction = { type: ADD_VIOLATION_SAVE_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
  }
}

function* saveAddViolationSaga() {
  yield takeFirst(ADD_VIOLATION_SAVE_REQUEST, saveAddViolation);
}

export default saveAddViolationSaga;
