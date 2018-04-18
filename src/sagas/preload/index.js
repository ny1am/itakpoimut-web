import { put, takeEvery, select } from 'redux-saga/effects';

import {
  PRELOAD_INITIAL_DATA_REQUEST, PRELOAD_INITIAL_DATA_SUCCESS,
} from 'consts/preload';

import extractFetchConfig from './utils/extractFetchConfig';

const loggedUserSelector = (state) => state.auth.loggedUser;

function* preload({ routeConfig, location, fetchOptions }) {
  const loggedUser = yield select(loggedUserSelector);
  const config = routeConfig.filter(
    ({ secure }) => (!secure || secure(loggedUser))
  );
  const payload = extractFetchConfig(location, config, fetchOptions);
  const newAction = { type: PRELOAD_INITIAL_DATA_SUCCESS, payload };
  yield put(newAction);
  return payload;
}

function* preloadSaga() {
  yield takeEvery(PRELOAD_INITIAL_DATA_REQUEST, preload);
}

export default preloadSaga;
