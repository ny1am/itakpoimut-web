import { CALL_TOKEN_API, API_ROOT } from 'constants';
import {
  CREATE_COMPANY_DATA_REQUEST, CREATE_COMPANY_DATA_SUCCESS, CREATE_COMPANY_DATA_FAILURE,
  CREATE_COMPANY_SAVE_REQUEST, CREATE_COMPANY_SAVE_SUCCESS, CREATE_COMPANY_SAVE_FAILURE,
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

export function save({ title, description, company_site, selectedCategories, selectedViolations, attachment }) {
  const body = new FormData();
  body.append('title', title);
  body.append('description', description);
  body.append('company_site', company_site);
  selectedCategories.forEach(category => {
    body.append('selectedCategories[]', category.value);
  });
  selectedViolations.forEach(violation => {
    body.append('selectedViolations[]', violation.value);
  });
  body.append('attachment', attachment);
  return {
    [CALL_TOKEN_API]: {
      endpoint: `${API_ROOT}/createCompany`,
      method: 'POST',
      body,
      types: [
        CREATE_COMPANY_SAVE_REQUEST,
        CREATE_COMPANY_SAVE_SUCCESS,
        CREATE_COMPANY_SAVE_FAILURE
      ]
    }
  };
}
