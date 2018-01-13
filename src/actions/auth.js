import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action';
import {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE,
  LOGOUT
} from 'constants/auth';

export function auth({ username, password }) {
  return {
    type: AUTH_REQUEST,
    username,
    password,
    [WAIT_FOR_ACTION]: AUTH_SUCCESS,
    [ERROR_ACTION]: AUTH_FAILURE,
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
