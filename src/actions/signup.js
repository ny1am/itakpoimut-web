import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS,
} from 'constants/signup';

export function signup({ fname, lname, email, password }) {
  return {
    type: SIGNUP_REQUEST,
    fname,
    lname,
    email,
    password,
    [WAIT_FOR_ACTION]: SIGNUP_SUCCESS,
  };
}
