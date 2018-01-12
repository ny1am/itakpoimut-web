import { DEFERRED } from 'constants';
import {
  ADD_CATEGORY_DATA_REQUEST,
  ADD_CATEGORY_SAVE_REQUEST,
} from 'constants/addCategory';

export function get(companyId) {
  return {
    type: ADD_CATEGORY_DATA_REQUEST,
    companyId,
    [DEFERRED]: true,
  };
}

export function save({ companyId, selectedCategories }) {
  return {
    type: ADD_CATEGORY_SAVE_REQUEST,
    companyId,
    selectedCategories,
    [DEFERRED]: true,
  };
}
