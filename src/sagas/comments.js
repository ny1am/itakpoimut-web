import { put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import queryString from 'query-string';

import {
  COMMENTS_REQUEST, COMMENTS_SUCCESS,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
} from 'consts/comments';
import { get } from 'actions/comments';
import { combine, takeFirst } from './utils/effects';
import apiSecureRequest from './utils/apiSecureRequest';
import apiRequest from './utils/apiRequest';

function* fetchComments({ id, currentPage }) {
  const url = `/comments/${id}?currentPage=${currentPage}`;
  const { payload } = yield apiRequest(url);
  if (payload) {
    const newAction = { type: COMMENTS_SUCCESS, payload };
    yield put(newAction);
  }
}

function* addComment({ companyId, text }) {
  const url = `/addComment`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: queryString.stringify({
      _company: companyId,
      text,
    }),
  };
  const { payload } = yield apiSecureRequest(url, options);
  if (payload) {
    const currentPage = 1;
    yield put(push({
      search: queryString.stringify({ currentPage }),
    }));
    yield put(get(companyId, currentPage));
    const newAction = { type: ADD_COMMENT_SUCCESS, payload };
    yield put(newAction);
  }
}

function* fetchCommentsSaga() {
  yield takeFirst(COMMENTS_REQUEST, fetchComments);
}

function* addCommentSaga() {
  yield takeFirst(ADD_COMMENT_REQUEST, addComment);
}

export default combine([
  fetchCommentsSaga,
  addCommentSaga,
]);
