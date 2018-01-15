import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  ADD_CATEGORY_DATA_REQUEST, ADD_CATEGORY_DATA_SUCCESS,
  ADD_CATEGORY_SAVE_REQUEST, ADD_CATEGORY_SAVE_SUCCESS,
} from 'constants/addCategory';

export function get(companyId) {
  return {
    type: ADD_CATEGORY_DATA_REQUEST,
    companyId,
    [WAIT_FOR_ACTION]: ADD_CATEGORY_DATA_SUCCESS,
  };
}

export function save({ companyId, selectedCategories }) {
  return {
    type: ADD_CATEGORY_SAVE_REQUEST,
    companyId,
    selectedCategories,
    [WAIT_FOR_ACTION]: ADD_CATEGORY_SAVE_SUCCESS,
  };
}
