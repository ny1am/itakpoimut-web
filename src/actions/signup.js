import { DEFERRED } from 'constants';
import {
  SIGNUP_REQUEST,
} from 'constants/signup';

export function signup({ fname, lname, email, password }) {
  return {
    type: SIGNUP_REQUEST,
    fname,
    lname,
    email,
    password,
    [DEFERRED]: true,
  };
}
