import { DEFERRED } from 'constants';
import {
  ADD_VIOLATION_DATA_REQUEST,
  ADD_VIOLATION_SAVE_REQUEST,
} from 'constants/addViolation';

export function get(companyId) {
  return {
    type: ADD_VIOLATION_DATA_REQUEST,
    companyId,
    [DEFERRED]: true,
  };
}

export function save({ companyId, selectedViolations }) {
  return {
    type: ADD_VIOLATION_SAVE_REQUEST,
    companyId,
    selectedViolations,
    [DEFERRED]: true,
  };
}
