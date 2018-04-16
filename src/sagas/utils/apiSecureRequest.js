import { call, put } from 'redux-saga/effects';

import { logout } from 'actions/auth';
import { loadAuth } from '../../store/storage';
import apiRequest from './apiRequest';

function* apiSecureRequest(url, options) {
  const auth = (yield call(loadAuth)) || {};
  const newOptions = Object.assign({ headers: {} }, options);
  newOptions.headers['Authorization'] = `JWT ${auth.token}`;
  try {
    const payload = yield apiRequest(url, newOptions);
    return payload;
  } catch (error) {
    if (error && error.status_code === 401) {
      yield put(logout());
    }
    throw error;
  }
}

export default apiSecureRequest;
