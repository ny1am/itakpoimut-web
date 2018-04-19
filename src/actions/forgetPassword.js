import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
} from 'consts/forgetPassword';

export function forgetPassword(email) {
  return {
    type: FORGET_PASSWORD_REQUEST,
    email,
    [WAIT_FOR_ACTION]: FORGET_PASSWORD_SUCCESS,
  };
}
