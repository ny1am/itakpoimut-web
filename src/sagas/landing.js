import { call, put, takeEvery } from 'redux-saga/effects';

import request from 'utils/request';
import { API_ROOT, DEFERRED } from 'constants';
import {
  LANDING_REQUEST, LANDING_SUCCESS,
} from 'constants/landing';


function* fetchData({ [DEFERRED]: deferred }) {
  try {
     const payload = yield call(request, `${API_ROOT}/`);
     const newAction = { type: LANDING_SUCCESS, payload };
     yield put(newAction);
     deferred.resolve(newAction);
  } catch (e) {
     //do nothing; todo: error handling
     deferred.reject(e);
  }
}

function* mySaga() {
  yield takeEvery(LANDING_REQUEST, fetchData);
}

export default mySaga;
