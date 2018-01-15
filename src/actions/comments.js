import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  COMMENTS_REQUEST, COMMENTS_SUCCESS,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
} from 'constants/comments';

export function get(id, currentPage = 1) {
  return {
    type: COMMENTS_REQUEST,
    id,
    currentPage,
    [WAIT_FOR_ACTION]: COMMENTS_SUCCESS,
  };
}

export function add(companyId, text) {
  return {
    type: ADD_COMMENT_REQUEST,
    companyId,
    text,
    [WAIT_FOR_ACTION]: ADD_COMMENT_SUCCESS,
  };
}
