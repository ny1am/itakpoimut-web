import { CALL_API } from 'redux-api-middleware';
import { API_ROOT } from 'constants';
import {
  COMPANY_REQUEST, COMPANY_SUCCESS, COMPANY_FAILURE,
} from 'constants/company';

export function get(id, currentPage = 1) {
  return {
    [CALL_API]: {
      endpoint: `${API_ROOT}/company/${id}?currentPage=${currentPage}`,
      method: 'GET',
      types: [
        COMPANY_REQUEST,
        COMPANY_SUCCESS,
        COMPANY_FAILURE
      ]
    }
  };
}
