import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  GET_CATEGORIES, GET_CATEGORIES_SUCCESS,
} from 'constants/category';

export function get() {
  return ({
    type: GET_CATEGORIES,
    [WAIT_FOR_ACTION]: GET_CATEGORIES_SUCCESS,
  });
}
