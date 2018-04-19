import { put, select, takeEvery } from 'redux-saga/effects';

import {
  FETCH_CATEGORIES_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
} from 'consts/category';
import apiRequest from './utils/apiRequest';

function* fetchCategoryList() {
  try {
    const payload = yield apiRequest(`/categories`);
    const newAction = { type: FETCH_CATEGORIES_SUCCESS, payload };
    yield put(newAction);
    return payload;
  } catch (error) {
    return null;
  }
}

function* getCachedCategoryList() {
  const categoryList = yield select((state) => {
    return state.category;
  });
  return categoryList;
}

function* getCategoryList() {
  let categoryList = yield getCachedCategoryList();
  if (!categoryList) {
    categoryList = yield fetchCategoryList();
  }
  if (categoryList) {
    const newAction = { type: GET_CATEGORIES_SUCCESS, payload: categoryList };
    yield put(newAction);
  }
  return categoryList;
}

function* getCategoryListSaga() {
  yield takeEvery(GET_CATEGORIES, getCategoryList);
}

export default getCategoryListSaga;
