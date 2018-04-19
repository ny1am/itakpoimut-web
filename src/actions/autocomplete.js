import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  AUTOCOMPLETE_REQUEST,
  AUTOCOMPLETE_SUCCESS,
} from 'consts/autocomplete';

export function search({ title, category }) {
  return {
    type: AUTOCOMPLETE_REQUEST,
    title,
    category,
    [WAIT_FOR_ACTION]: AUTOCOMPLETE_SUCCESS,
  };
}
