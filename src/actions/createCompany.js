import { CALL_TOKEN_API, API_ROOT } from 'constants';
import {
  CREATE_COMPANY_DATA_REQUEST, CREATE_COMPANY_DATA_SUCCESS, CREATE_COMPANY_DATA_FAILURE,
} from 'constants/createCompany';

export function get() {
  return {
    [CALL_TOKEN_API]: {
      endpoint: `${API_ROOT}/createCompany`,
      method: 'GET',
      types: [
        CREATE_COMPANY_DATA_REQUEST,
        CREATE_COMPANY_DATA_SUCCESS,
        CREATE_COMPANY_DATA_FAILURE
      ]
    }
  };
}
