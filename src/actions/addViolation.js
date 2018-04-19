import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  ADD_VIOLATION_SAVE_REQUEST,
  ADD_VIOLATION_SAVE_SUCCESS,
} from 'consts/addViolation';

export function save({ companyId, selectedViolations }) {
  return {
    type: ADD_VIOLATION_SAVE_REQUEST,
    companyId,
    selectedViolations,
    [WAIT_FOR_ACTION]: ADD_VIOLATION_SAVE_SUCCESS,
  };
}
