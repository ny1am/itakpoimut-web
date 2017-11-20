import { CALL_TOKEN_API, API_ROOT } from 'constants';
import {
  USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAILURE,
  SAVE_USER_PROFILE_REQUEST, SAVE_USER_PROFILE_SUCCESS, SAVE_USER_PROFILE_FAILURE,
} from 'constants/userProfile';
import { updateUser } from '../store/storage';

export function get() {
  return {
    [CALL_TOKEN_API]: {
      endpoint: `${API_ROOT}/userProfile`,
      method: 'GET',
      types: [
        USER_PROFILE_REQUEST,
        USER_PROFILE_SUCCESS,
        USER_PROFILE_FAILURE
      ]
    }
  };
}

const processUserPayload = (action, state, res) => {
  return res.json().then(json => {
    if (json.user) {
      updateUser(json.user);
    }
    return json;
  });
};

export function save({ fname, lname }) {
  let body = new URLSearchParams();
  body.set('fname', fname);
  body.set('lname', lname);
  return {
    [CALL_TOKEN_API]: {
      endpoint: `${API_ROOT}/userProfile`,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body,
      types: [
        SAVE_USER_PROFILE_REQUEST,
        {
          type: SAVE_USER_PROFILE_SUCCESS,
          payload: processUserPayload,
        },
        SAVE_USER_PROFILE_FAILURE
      ]
    }
  };
}
