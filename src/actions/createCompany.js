import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  CREATE_COMPANY_SAVE_REQUEST,
  CREATE_COMPANY_SAVE_SUCCESS,
} from 'consts/createCompany';

export function save({
  title,
  description,
  company_site,
  selectedCategories,
  selectedViolations,
  attachment,
}) {
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
