import { CALL_API } from 'redux-api-middleware';
import { API_ROOT } from 'constants';
import {
  LANDING_REQUEST, LANDING_SUCCESS, LANDING_FAILURE,
} from 'constants/landing';

export function get() {
  return {
    [CALL_API]: {
      endpoint: `${API_ROOT}/`,
      method: 'GET',
      types: [
        LANDING_REQUEST,
        LANDING_SUCCESS,
        LANDING_FAILURE
      ]
    }
  };
}
