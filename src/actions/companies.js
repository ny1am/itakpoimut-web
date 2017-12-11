import { CALL_API } from 'redux-api-middleware';
import queryString from 'query-string';

import { API_ROOT } from 'constants';
import {
  COMPANIES_REQUEST, COMPANIES_SUCCESS, COMPANIES_FAILURE,
} from 'constants/companies';
import { removeFalsy, fixArray } from 'utils';

export function get({ currentPage = 1, sortOrder = 'asc', title, selectedCategory, formData = {} }) {
  //todo
  let params = Object.assign({}, removeFalsy({ title, selectedCategory }), removeFalsy(formData));
  params = fixArray(params);
  return {
    [CALL_API]: {
      endpoint: `${API_ROOT}/companies?currentPage=${currentPage}&sortOrder=${sortOrder}&${queryString.stringify(params)}`,
      method: 'GET',
      types: [
        COMPANIES_REQUEST,
        COMPANIES_SUCCESS,
        COMPANIES_FAILURE
      ]
    }
  };
}
