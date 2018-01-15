import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import toFormData from 'object-to-formdata';

import takeFirst from 'utils/takeFirst';
import { secureRequest } from 'utils/request';
import {
  USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS,
  SAVE_USER_PROFILE_REQUEST, SAVE_USER_PROFILE_SUCCESS,
} from 'constants/userProfile';
import { updateUser } from '../store/storage';

function* fetchData() {
  try {
    const payload = yield call(secureRequest, `/userProfile`);
    const newAction = { type: USER_PROFILE_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* saveData({ fname, lname, userpic }) {
  const url = `/userProfile`;
  const params = { fname, lname, userpic };
  try {
    const payload = yield call(secureRequest, url, {
      method: 'POST',
      body: toFormData(params),
    });
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
  yield takeFirst(SAVE_USER_PROFILE_REQUEST, saveData);
}

function* userProfileSaga() {
  yield all([
    fork(fetchDataSaga),
    fork(saveDataSaga),
  ]);
}

export default userProfileSaga;
