import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  COMPANY_REQUEST, COMPANY_SUCCESS,
} from 'constants/company';

export function get(id) {
  return {
    type: COMPANY_REQUEST,
    id,
    [WAIT_FOR_ACTION]: COMPANY_SUCCESS,
  };
}
