import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  ADD_CATEGORY_SAVE_REQUEST,
  ADD_CATEGORY_SAVE_SUCCESS,
} from 'consts/addCategory';

export function save({ companyId, selectedCategories }) {
  return {
    type: ADD_CATEGORY_SAVE_REQUEST,
    companyId,
    selectedCategories,
    [WAIT_FOR_ACTION]: ADD_CATEGORY_SAVE_SUCCESS,
  };
}
