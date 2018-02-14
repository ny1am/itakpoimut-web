import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,
} from 'consts/resetPassword';

export function resetPassword({ password, token }) {
  return {
    type: RESET_PASSWORD_REQUEST,
    password,
    token,
    [WAIT_FOR_ACTION]: RESET_PASSWORD_SUCCESS,
  };
}
