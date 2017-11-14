import { CALL_API } from 'redux-api-middleware';
import { push } from 'react-router-redux';

import { API_ROOT } from 'constants';
import {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE,
  LOGOUT
} from 'constants/auth';

import { saveToken } from '../store/storage';

const processTokenPayload = (action, state, res) => {
  return res.json().then(json => {
    saveToken(json);
    return json;
  });
};

const errorTokenPayload = (action, state, res) => {
  return res.json().then((json) => {
    saveToken(null);
    return json;
  });
};

export function auth(username, password) {
  let body = new URLSearchParams();
  body.set('username', username);
  body.set('password', password);
  return {
    [CALL_API]: {
      endpoint: `${API_ROOT}/token`,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body,
      types: [
        AUTH_REQUEST,
        {
          type: AUTH_SUCCESS,
          payload: processTokenPayload,
        },
        {
          type: AUTH_FAILURE,
          payload: errorTokenPayload,
        },
      ]
    }
  };
}

export function logout() {
  saveToken(null);
  return (dispatch) => {
    return dispatch({type: LOGOUT}).then(()=> {
      return dispatch(push('/login'));
    });
  };
}