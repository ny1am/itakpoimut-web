import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import { LANDING_REQUEST, LANDING_SUCCESS } from 'constants/landing';

export function get() {
  return ({
    type: LANDING_REQUEST,
    [WAIT_FOR_ACTION]: LANDING_SUCCESS,
  });
}
