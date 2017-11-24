import { CALL_TOKEN_API, API_ROOT } from 'constants';
import {
  ADD_VIOLATION_DATA_REQUEST, ADD_VIOLATION_DATA_SUCCESS, ADD_VIOLATION_DATA_FAILURE,
  ADD_VIOLATION_SAVE_REQUEST, ADD_VIOLATION_SAVE_SUCCESS, ADD_VIOLATION_SAVE_FAILURE,
} from 'constants/addViolation';

export function get(companyId) {
  return {
    [CALL_TOKEN_API]: {
      endpoint: `${API_ROOT}/addViolation?company_id=${companyId}`,
      method: 'GET',
      types: [
        ADD_VIOLATION_DATA_REQUEST,
        ADD_VIOLATION_DATA_SUCCESS,
        ADD_VIOLATION_DATA_FAILURE
      ]
    }
  };
}

export function save({ companyId, selectedViolations }) {
  const body = new URLSearchParams();
  body.append('company_id', companyId);
  selectedViolations.forEach(violation => {
    body.append('selectedViolations[]', violation);
  });
  return {
    [CALL_TOKEN_API]: {
      endpoint: `${API_ROOT}/addViolation`,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      types: [
        ADD_VIOLATION_SAVE_REQUEST,
        ADD_VIOLATION_SAVE_SUCCESS,
        ADD_VIOLATION_SAVE_FAILURE
      ]
    }
  };
}
