import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import queryString from 'query-string';

import request, { secureRequest } from 'utils/request';
import {
  COMPANY_REQUEST, COMPANY_SUCCESS,
  COMMENTS_REQUEST, COMMENTS_SUCCESS,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
} from 'constants/company';

function* fetchData({ id }) {
  try {
    const payload = yield call(request, `/company/${id}`);
    const newAction = { type: COMPANY_SUCCESS, payload };
    yield put(newAction);
  } catch (e) {
    //do nothing; todo: error handling
  }
}

function* fetchCommentsData({ id, currentPage }) {
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
  yield takeEvery(COMPANY_REQUEST, fetchData);
}

function* fetchCommentsDataSaga() {
  yield takeEvery(COMMENTS_REQUEST, fetchCommentsData);
}

function* addCommentSaga() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}

function* companySaga() {
  yield all([
    fork(fetchDataSaga),
    fork(fetchCommentsDataSaga),
    fork(addCommentSaga),
  ]);
}

export default companySaga;
