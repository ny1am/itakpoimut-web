import { CALL_API } from 'redux-api-middleware';

import { API_ROOT } from 'constants';
import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
} from 'constants/signup';

export function signup({ fname, lname, email, password }) {
  let body = new URLSearchParams();
  body.set('fname', fname);
  body.set('lname', lname);
  body.set('email', email);
  body.set('password', password);
  return {
    [CALL_API]: {
      endpoint: `${API_ROOT}/signup`,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body,
      types: [
        SIGNUP_REQUEST,
        SIGNUP_SUCCESS,
        SIGNUP_FAILURE,
      ]
    }
  };
}
