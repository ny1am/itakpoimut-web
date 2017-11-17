import { CALL_API } from 'redux-api-middleware';
import { API_ROOT } from 'constants';
import {
  COMPANIES_REQUEST, COMPANIES_SUCCESS, COMPANIES_FAILURE,
} from 'constants/companies';

export function get(currentPage = 1, sortOrder = 'asc', formData = '') {
  return {
    [CALL_API]: {
      endpoint: `${API_ROOT}/companies?currentPage=${currentPage}&sortOrder=${sortOrder}&${formData}`,
      method: 'GET',
      types: [
        COMPANIES_REQUEST,
        COMPANIES_SUCCESS,
        COMPANIES_FAILURE
      ]
    }
  };
}
