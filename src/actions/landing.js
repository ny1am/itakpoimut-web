import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  LAST_COMMENTS_REQUEST, LAST_COMMENTS_SUCCESS,
  NEW_COMPANIES_REQUEST, NEW_COMPANIES_SUCCESS,
} from 'constants/landing';

export function getLastComments() {
  return ({
    type: LAST_COMMENTS_REQUEST,
    [WAIT_FOR_ACTION]: LAST_COMMENTS_SUCCESS,
  });
}

export function getNewCompanies() {
  return ({
    type: NEW_COMPANIES_REQUEST,
    [WAIT_FOR_ACTION]: NEW_COMPANIES_SUCCESS,
  });
}
