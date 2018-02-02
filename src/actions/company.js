import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  GET_COMPANY, GET_COMPANY_SUCCESS,
} from 'consts/company';

export function get(id) {
  return {
    type: GET_COMPANY,
    id,
    [WAIT_FOR_ACTION]: GET_COMPANY_SUCCESS,
  };
}
