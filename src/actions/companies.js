import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  COMPANIES_REQUEST, COMPANIES_SUCCESS,
  LOYALTY_CHANGED, CATEGORY_CHANGED,
  ADD_VIOLATION_FILTER, REMOVE_VIOLATION_FILTER,
  CLEAR_FILTERS,
} from 'consts/companies';

export function get({ currentPage = 1, sortOrder = 'asc', title = '', filters = {} }) {
  return {
    type: COMPANIES_REQUEST,
    currentPage,
    sortOrder,
    title,
    filters,
    [WAIT_FOR_ACTION]: COMPANIES_SUCCESS,
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

export function addViolationFilter(value) {
  return {
    type: ADD_VIOLATION_FILTER,
    value
  };
}

export function removeViolationFilter(value) {
  return {
    type: REMOVE_VIOLATION_FILTER,
    value
  };
}
