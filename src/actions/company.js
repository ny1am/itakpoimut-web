import { WAIT_FOR_ACTION } from 'redux-wait-for-action';
import {
  COMPANY_REQUEST, COMPANY_SUCCESS,
  COMMENTS_REQUEST, COMMENTS_SUCCESS,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
} from 'constants/company';

export function get(id) {
  return {
    type: COMPANY_REQUEST,
    id,
    [WAIT_FOR_ACTION]: COMPANY_SUCCESS,
  };
}

export function getComments(id, currentPage = 1) {
  return {
    type: COMMENTS_REQUEST,
    id,
    currentPage,
    [WAIT_FOR_ACTION]: COMMENTS_SUCCESS,
  };
}

export function addComment(companyId, text) {
  return {
    type: ADD_COMMENT_REQUEST,
    companyId,
    text,
    [WAIT_FOR_ACTION]: ADD_COMMENT_SUCCESS,
  };
}
