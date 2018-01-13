import { WAIT_FOR_ACTION } from 'redux-wait-for-action';
import {
  CREATE_COMPANY_DATA_REQUEST, CREATE_COMPANY_DATA_SUCCESS,
  CREATE_COMPANY_SAVE_REQUEST, CREATE_COMPANY_SAVE_SUCCESS,
} from 'constants/createCompany';

export function get() {
  return {
    type: CREATE_COMPANY_DATA_REQUEST,
    [WAIT_FOR_ACTION]: CREATE_COMPANY_DATA_SUCCESS,
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
    [WAIT_FOR_ACTION]: CREATE_COMPANY_SAVE_SUCCESS,
  };
}
