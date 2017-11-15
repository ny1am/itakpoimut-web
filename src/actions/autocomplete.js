import { CALL_API } from 'redux-api-middleware';
import { API_ROOT } from 'constants';
import {
  AUTOCOMPLETE_REQUEST, AUTOCOMPLETE_SUCCESS, AUTOCOMPLETE_FAILURE,
} from 'constants/autocomplete';
import { removeFalsy, encodeQueryData } from 'utils';

export function search({ term, category }) {
  return {
    [CALL_API]: {
      endpoint: `${API_ROOT}/autocomplete?${encodeQueryData(removeFalsy({ term, category }))}`,
      method: 'GET',
      types: [
        AUTOCOMPLETE_REQUEST,
        AUTOCOMPLETE_SUCCESS,
        AUTOCOMPLETE_FAILURE
      ]
    }
  };
}
