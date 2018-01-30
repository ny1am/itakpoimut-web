import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { API_ROOT } from 'constants';
import request from 'utils/request';
import { requestError } from 'actions/global';
import { hideDialog } from 'actions/dialog';

function* apiRequest(url, options) {
  try {
    const payload = yield call(request, `${API_ROOT}${url}`, options);
    return { payload };
  } catch(error) {
    if (error instanceof TypeError) {
      yield put(hideDialog());
      yield put(push('/oops'));
    }
    yield put(requestError(error));
    return { error };
  }
}

export default apiRequest;
