import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action';

import {
  AUTH_REQUEST,
  FB_AUTH_REQUEST,
  GOOGLE_AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGOUT,
} from 'consts/auth';

export function auth({ username, password }) {
  return {
    type: AUTH_REQUEST,
    username,
    password,
    [WAIT_FOR_ACTION]: AUTH_SUCCESS,
    [ERROR_ACTION]: AUTH_FAILURE,
  };
}

export function fbAuth(accessToken) {
  return {
    type: FB_AUTH_REQUEST,
    accessToken,
    [WAIT_FOR_ACTION]: AUTH_SUCCESS,
    [ERROR_ACTION]: AUTH_FAILURE,
  };
}

export function googleAuth(accessToken) {
  return {
    type: GOOGLE_AUTH_REQUEST,
    accessToken,
    [WAIT_FOR_ACTION]: AUTH_SUCCESS,
    [ERROR_ACTION]: AUTH_FAILURE,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
