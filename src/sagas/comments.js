import { put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import queryString from 'query-string';

import {
  COMMENTS_REQUEST, COMMENTS_SUCCESS,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
} from 'consts/comments';
import { combine, takeFirst } from './utils/effects';
import apiSecureRequest from './utils/apiSecureRequest';
import apiRequest from './utils/apiRequest';

function* fetchComments({ id, currentPage }) {
  const url = `/comments/${id}?currentPage=${currentPage}`;
  try {
    const payload = yield apiRequest(url);
    const newAction = { type: COMMENTS_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
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
  try {
    const payload = yield apiSecureRequest(url, options);
    const currentPage = 1;
    yield put(push({
      search: queryString.stringify({ currentPage }),
      hash: 'new-comment'
    }));
    yield call(fetchComments, { id: companyId, currentPage });
    const newAction = { type: ADD_COMMENT_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
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
