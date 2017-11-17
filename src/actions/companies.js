import { CALL_API } from 'redux-api-middleware';
import { API_ROOT } from 'constants';
import {
  COMPANIES_REQUEST, COMPANIES_SUCCESS, COMPANIES_FAILURE,
} from 'constants/companies';
import { removeFalsy, encodeQueryData } from 'utils';

export function get({ currentPage = 1, sortOrder = 'asc', title, selectedCategory, formData = {} }) {
  //todo
  const params = Object.assign({}, removeFalsy({ title, selectedCategory }), removeFalsy(formData));
  return {
    [CALL_API]: {
      endpoint: `${API_ROOT}/companies?currentPage=${currentPage}&sortOrder=${sortOrder}&${encodeQueryData(params)}`,
      method: 'GET',
      types: [
        COMPANIES_REQUEST,
        COMPANIES_SUCCESS,
        COMPANIES_FAILURE
      ]
    }
  };
}
