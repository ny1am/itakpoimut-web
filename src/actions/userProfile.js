import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS,
  SAVE_USER_PROFILE_REQUEST, SAVE_USER_PROFILE_SUCCESS,
} from 'constants/userProfile';

export function get() {
  return {
    type: USER_PROFILE_REQUEST,
    [WAIT_FOR_ACTION]: USER_PROFILE_SUCCESS,
  };
}

export function save({ fname, lname, userpic }) {
  return {
    type: SAVE_USER_PROFILE_REQUEST,
    fname,
    lname,
    userpic,
    [WAIT_FOR_ACTION]: SAVE_USER_PROFILE_SUCCESS,
  };
}
