import { DEFERRED } from 'constants';
import {
  COMPANY_REQUEST,
  COMMENTS_REQUEST,
  ADD_COMMENT_REQUEST,
} from 'constants/company';

export function get(id) {
  return {
    type: COMPANY_REQUEST,
    id,
    [DEFERRED]: true,
  };
}

export function getComments(id, currentPage = 1) {
  return {
    type: COMMENTS_REQUEST,
    id,
    currentPage,
    [DEFERRED]: true,
  };
}

export function addComment(companyId, text) {
  return {
    type: ADD_COMMENT_REQUEST,
    companyId,
    text,
    [DEFERRED]: true,
  };
}
