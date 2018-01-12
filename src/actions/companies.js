import { DEFERRED } from 'constants';
import {
  COMPANIES_REQUEST,
  LOYALTY_CHANGED, CATEGORY_CHANGED, VIOLATION_CHANGED,
  CLEAR_FILTERS,
} from 'constants/companies';

export function get({ currentPage = 1, sortOrder = 'asc', title = '', filters = {} }) {
  return {
    type: COMPANIES_REQUEST,
    currentPage,
    sortOrder,
    title,
    filters,
    [DEFERRED]: true,
  };
}

export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  };
}

export function changeLoyalty(newValue) {
  return {
    type: LOYALTY_CHANGED,
    newValue
  };
}

export function changeCategory(newValue) {
  return {
    type: CATEGORY_CHANGED,
    newValue
  };
}

export function changeViolation(newValue) {
  return {
    type: VIOLATION_CHANGED,
    newValue
  };
}
