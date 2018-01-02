import { CALL_API } from 'redux-api-middleware';
import queryString from 'query-string';

import { API_ROOT } from 'constants';
import {
  COMPANIES_REQUEST, COMPANIES_SUCCESS, COMPANIES_FAILURE,
  LOYALTY_CHANGED, CATEGORY_CHANGED, VIOLATION_CHANGED,
  CLEAR_FILTERS,
} from 'constants/companies';

export function get({ currentPage = 1, sortOrder = 'asc', title = '', filters = {} }) {
  return {
    [CALL_API]: {
      endpoint: `${API_ROOT}/companies?currentPage=${currentPage}&sortOrder=${sortOrder}&title=${title}&${queryString.stringify(filters)}`,
      method: 'GET',
      types: [
        COMPANIES_REQUEST,
        COMPANIES_SUCCESS,
        COMPANIES_FAILURE
      ]
    }
  };
}

export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  };
}

export function changeLoyalty(newValue) {
  return {
    type: LOYALTY_CHANGED,
    newValue
  };
}

export function changeCategory(newValue) {
  return {
    type: CATEGORY_CHANGED,
    newValue
  };
}

export function changeViolation(newValue) {
  return {
    type: VIOLATION_CHANGED,
    newValue
  };
}
