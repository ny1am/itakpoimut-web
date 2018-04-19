import { put, select, takeEvery } from 'redux-saga/effects';

import {
  FETCH_VIOLATIONS_SUCCESS,
  GET_VIOLATIONS,
  GET_VIOLATIONS_SUCCESS,
} from 'consts/violation';
import apiRequest from './utils/apiRequest';

function* fetchViolationList() {
  try {
    const payload = yield apiRequest(`/violations`);
    const newAction = { type: FETCH_VIOLATIONS_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
  }
}

function* getCachedViolationList() {
  const violationList = yield select((state) => {
    return state.violation;
  });
  return violationList;
}

function* getViolationList() {
  let violationList = yield getCachedViolationList();
  if (!violationList) {
    violationList = yield fetchViolationList();
  }
  if (violationList) {
    const newAction = { type: GET_VIOLATIONS_SUCCESS, payload: violationList };
    yield put(newAction);
  }
  return violationList;
}

function* getViolationListSaga() {
  yield takeEvery(GET_VIOLATIONS, getViolationList);
}

export default getViolationListSaga;
