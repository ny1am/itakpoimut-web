import { call, put } from 'redux-saga/effects';

import { logout } from 'actions/auth';
import { loadAuth } from '../../store/storage';
import apiRequest from './apiRequest';

function* apiSecureRequest(url, options) {
  const auth = (yield call(loadAuth)) || {};
  const newOptions = Object.assign({ headers: {} }, options);
  newOptions.headers['Authorization'] = `JWT ${auth.token}`;
  const { payload, error } = yield apiRequest(url, newOptions);
  if (error && error.status_code === 401) {
    yield put(logout());
  }
  return { payload, error };
}

export default apiSecureRequest;
