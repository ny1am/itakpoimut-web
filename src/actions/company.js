import { CALL_API } from 'redux-api-middleware';
import { CALL_TOKEN_API, API_ROOT } from 'constants';
import {
  COMPANY_REQUEST, COMPANY_SUCCESS, COMPANY_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
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

export function addComment(companyId, text) {
  let body = new URLSearchParams();
  body.set('_company', companyId);
  body.set('text', text);
  return {
    [CALL_TOKEN_API]: {
      endpoint: `${API_ROOT}/addComment`,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      types: [
        ADD_COMMENT_REQUEST,
        ADD_COMMENT_SUCCESS,
        ADD_COMMENT_FAILURE
      ]
    }
  };
}
