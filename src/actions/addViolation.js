import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  ADD_VIOLATION_DATA_REQUEST, ADD_VIOLATION_DATA_SUCCESS,
  ADD_VIOLATION_SAVE_REQUEST, ADD_VIOLATION_SAVE_SUCCESS,
} from 'constants/addViolation';

export function get(companyId) {
  return {
    type: ADD_VIOLATION_DATA_REQUEST,
    companyId,
    [WAIT_FOR_ACTION]: ADD_VIOLATION_DATA_SUCCESS,
  };
}

export function save({ companyId, selectedViolations }) {
  return {
    type: ADD_VIOLATION_SAVE_REQUEST,
    companyId,
    selectedViolations,
    [WAIT_FOR_ACTION]: ADD_VIOLATION_SAVE_SUCCESS,
  };
}
