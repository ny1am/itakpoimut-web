import { put } from 'redux-saga/effects';
import toFormData from 'object-to-formdata';

import {
  CREATE_COMPANY_SAVE_REQUEST, CREATE_COMPANY_SAVE_SUCCESS,
} from 'consts/createCompany';
import { takeFirst } from './utils/effects';
import apiSecureRequest from './utils/apiSecureRequest';

function* saveCreateCompany({ title, description, company_site, selectedCategories, selectedViolations, attachment }) {
  const url = `/createCompany`;
  const options = {
    method: 'POST',
    body: toFormData({
      title, description, company_site, attachment,
      'selectedCategories[]': selectedCategories,
      'selectedViolations[]': selectedViolations,
    }),
  };
  const { payload } = yield apiSecureRequest(url, options);
  if (payload) {
    const newAction = { type: CREATE_COMPANY_SAVE_SUCCESS, payload };
    yield put(newAction);
  }
}

function* saveCreateCompanySaga() {
  yield takeFirst(CREATE_COMPANY_SAVE_REQUEST, saveCreateCompany);
}

export default saveCreateCompanySaga;
