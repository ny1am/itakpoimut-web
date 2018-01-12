import { DEFERRED } from 'constants';
import {
  CREATE_COMPANY_DATA_REQUEST,
  CREATE_COMPANY_SAVE_REQUEST,
} from 'constants/createCompany';

export function get() {
  return {
    type: CREATE_COMPANY_DATA_REQUEST,
    [DEFERRED]: true,
  };
}

export function save({ title, description, company_site, selectedCategories, selectedViolations, attachment }) {
  return {
    type: CREATE_COMPANY_SAVE_REQUEST,
    title,
    description,
    company_site,
    selectedCategories,
    selectedViolations,
    attachment,
    [DEFERRED]: true,
  };
}
