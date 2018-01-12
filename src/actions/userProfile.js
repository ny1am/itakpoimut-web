import { DEFERRED } from 'constants';
import {
  USER_PROFILE_REQUEST,
  SAVE_USER_PROFILE_REQUEST,
} from 'constants/userProfile';

export function get() {
  return {
    type: USER_PROFILE_REQUEST,
    [DEFERRED]: true,
  };
}

export function save({ fname, lname, userpic }) {
  return {
    type: SAVE_USER_PROFILE_REQUEST,
    fname,
    lname,
    userpic,
    [DEFERRED]: true,
  };
}
