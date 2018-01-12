import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import request from 'utils/request';
import { API_ROOT, DEFERRED, TOKEN } from 'constants';
import {
  COMPANY_REQUEST, COMPANY_SUCCESS,
  COMMENTS_REQUEST, COMMENTS_SUCCESS,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
} from 'constants/company';

function* fetchData({ id, [DEFERRED]: deferred }) {
  try {
    const url = `${API_ROOT}/company/${id}`;
    const payload = yield call(request, url);
    const newAction = { type: COMPANY_SUCCESS, payload };
    yield put(newAction);
    deferred.resolve(newAction);
  } catch (e) {
    //do nothing; todo: error handling
    deferred.reject(e);
  }
}

function* fetchCommentsData({ id, currentPage, [DEFERRED]: deferred }) {
  try {
    const url = `${API_ROOT}/comments/${id}?currentPage=${currentPage}`;
    const payload = yield call(request, url);
    const newAction = { type: COMMENTS_SUCCESS, payload };
    yield put(newAction);
    deferred.resolve(newAction);
  } catch (e) {
    //do nothing; todo: error handling
    deferred.reject(e);
  }
}

function* addComment({ companyId, text, [DEFERRED]: deferred }) {
  try {
    const url = `${API_ROOT}/addComment`;
    const body = new URLSearchParams();
    body.set('_company', companyId);
    body.set('text', text);
    const requestParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      [TOKEN]: true,
    };
    const payload = yield call(request, url, requestParams);
    const newAction = { type: ADD_COMMENT_SUCCESS, payload };
    yield put(newAction);
    deferred.resolve(newAction);
  } catch (e) {
    //do nothing; todo: error handling
    deferred.reject(e);
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
