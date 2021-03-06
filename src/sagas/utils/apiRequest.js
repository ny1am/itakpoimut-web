import { call, put } from 'redux-saga/effects';

import { API_ROOT } from 'consts';
import request from 'utils/request';
import { requestError } from 'actions/global';

function* apiRequest(url, options) {
  try {
    const payload = yield call(request, `${API_ROOT}${url}`, options);
    return payload;
  } catch (error) {
    yield put(requestError(error));
    throw error;
  }
}

export default apiRequest;
