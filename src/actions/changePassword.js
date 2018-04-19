import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
} from 'consts/changePassword';

export function changePassword({ password, newPassword }) {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    password,
    newPassword,
    [WAIT_FOR_ACTION]: CHANGE_PASSWORD_SUCCESS,
  };
}
