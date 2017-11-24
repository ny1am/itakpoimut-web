import { CALL_TOKEN_API, API_ROOT } from 'constants';
import {
  ADD_CATEGORY_DATA_REQUEST, ADD_CATEGORY_DATA_SUCCESS, ADD_CATEGORY_DATA_FAILURE,
  ADD_CATEGORY_SAVE_REQUEST, ADD_CATEGORY_SAVE_SUCCESS, ADD_CATEGORY_SAVE_FAILURE,
} from 'constants/addCategory';

export function get(companyId) {
  return {
    [CALL_TOKEN_API]: {
      endpoint: `${API_ROOT}/addCategory?company_id=${companyId}`,
      method: 'GET',
      types: [
        ADD_CATEGORY_DATA_REQUEST,
        ADD_CATEGORY_DATA_SUCCESS,
        ADD_CATEGORY_DATA_FAILURE
      ]
    }
  };
}

export function save({ companyId, selectedCategories }) {
  const body = new URLSearchParams();
  body.append('company_id', companyId);
  selectedCategories.forEach(category => {
    body.append('selectedCategories[]', category);
  });
  return {
    [CALL_TOKEN_API]: {
      endpoint: `${API_ROOT}/addCategory`,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      types: [
        ADD_CATEGORY_SAVE_REQUEST,
        ADD_CATEGORY_SAVE_SUCCESS,
        ADD_CATEGORY_SAVE_FAILURE
      ]
    }
  };
}
