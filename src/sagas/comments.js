import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import queryString from 'query-string';

import request, { secureRequest } from 'utils/request';
import {
  COMMENTS_REQUEST, COMMENTS_SUCCESS,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
} from 'constants/comments';

function* fetchData({ id, currentPage }) {
  const url = `/comments/${id}?currentPage=${currentPage}`;
  try {
    const payload = yield call(request, url);
    const newAction = { type: COMMENTS_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* addComment({ companyId, text }) {
  const url = `/addComment`;
  const params = {
    _company: companyId,
    text,
  };
  try {
    const payload = yield call(secureRequest, url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: queryString.stringify(params),
    });
    const newAction = { type: ADD_COMMENT_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* fetchDataSaga() {
  yield takeEvery(COMMENTS_REQUEST, fetchData);
}

function* addCommentSaga() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}

function* commentsSaga() {
  yield all([
    fork(fetchDataSaga),
    fork(addCommentSaga),
  ]);
}

export default commentsSaga;
