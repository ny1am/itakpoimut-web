import { call, put, takeEvery, fork, all } from 'redux-saga/effects';

import request from 'utils/request';
import { API_ROOT, TOKEN } from 'constants';
import {
  USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS,
  SAVE_USER_PROFILE_REQUEST, SAVE_USER_PROFILE_SUCCESS,
} from 'constants/userProfile';
import { updateUser } from '../store/storage';

function* fetchData() {
  try {
    const url = `${API_ROOT}/userProfile`;
    const requestParams = {
      [TOKEN]: true,
    };
    const payload = yield call(request, url, requestParams);
    const newAction = { type: USER_PROFILE_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* saveData({ fname, lname, userpic }) {
  try {
    const body = new FormData();
    body.append('fname', fname);
    body.append('lname', lname);
    body.append('userpic', userpic);
    const url = `${API_ROOT}/userProfile`;
    const requestParams = {
      method: 'POST',
      body,
      [TOKEN]: true,
    };
    const payload = yield call(request, url, requestParams);
    const newAction = { type: SAVE_USER_PROFILE_SUCCESS, payload };
    payload.user && updateUser(payload.user);
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* fetchDataSaga() {
  yield takeEvery(USER_PROFILE_REQUEST, fetchData);
}

function* saveDataSaga() {
  yield takeEvery(SAVE_USER_PROFILE_REQUEST, saveData);
}

function* userProfileSaga() {
  yield all([
    fork(fetchDataSaga),
    fork(saveDataSaga),
  ]);
}

export default userProfileSaga;
