import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  GET_VIOLATIONS, GET_VIOLATIONS_SUCCESS,
} from 'consts/violation';

export function get() {
  return ({
    type: GET_VIOLATIONS,
    [WAIT_FOR_ACTION]: GET_VIOLATIONS_SUCCESS,
  });
}
