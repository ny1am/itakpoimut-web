import { DEFERRED } from 'constants';
import {
  AUTH_REQUEST,
  LOGOUT
} from 'constants/auth';

export function auth({ username, password }) {
  return {
    type: AUTH_REQUEST,
    username,
    password,
    [DEFERRED]: true,
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
