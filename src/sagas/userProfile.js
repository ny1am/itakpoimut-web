import { call, put, takeEvery } from 'redux-saga/effects';
import toFormData from 'object-to-formdata';

import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  SAVE_USER_PROFILE_REQUEST,
  SAVE_USER_PROFILE_SUCCESS,
} from 'consts/userProfile';
import { updateUser } from '../store/storage';
import { combine, takeFirst } from './utils/effects';
import apiSecureRequest from './utils/apiSecureRequest';

function* fetchUserProfile() {
  try {
    const payload = yield apiSecureRequest(`/userProfile`);
    const newAction = { type: USER_PROFILE_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
  }
}

function* saveUserProfile({ fname, lname, userpic }) {
  const url = `/userProfile`;
  const options = {
    method: 'POST',
    body: toFormData({ fname, lname, userpic }),
  };
  try {
    const payload = yield apiSecureRequest(url, options);
    yield call(updateUser, payload.user);
    const newAction = { type: SAVE_USER_PROFILE_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
  }
}

function* fetchUserProfileSaga() {
  yield takeEvery(USER_PROFILE_REQUEST, fetchUserProfile);
}

function* saveUserProfileSaga() {
  yield takeFirst(SAVE_USER_PROFILE_REQUEST, saveUserProfile);
}

export default combine([fetchUserProfileSaga, saveUserProfileSaga]);
