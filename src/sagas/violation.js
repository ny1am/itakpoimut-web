import { put, select, takeEvery } from 'redux-saga/effects';

import {
  FETCH_VIOLATIONS_SUCCESS,
  GET_VIOLATIONS, GET_VIOLATIONS_SUCCESS,
} from 'constants/violation';
import apiRequest from './utils/apiRequest';

function* fetchViolationList() {
  const { payload } = yield apiRequest(`/violations`);
  if (payload) {
    const newAction = { type: FETCH_VIOLATIONS_SUCCESS, payload };
    yield put(newAction);
  }
  return payload;
}

function* getCachedViolationList() {
  const violationList = yield select(state => {
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
