import { API_ROOT } from 'constants';
import { loadAuth } from '../store/storage';

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return response.json().then(err => {throw err;});
}

const request = (url, params) => {
  return fetch(`${API_ROOT}${url}`, params)
    .then(checkStatus)
    .then(parseJSON);
};

const secureRequest = (url, params) => {
  const auth = loadAuth() || {};
  const newParams = Object.assign({ headers: {} }, params);
  newParams.headers['Authorization'] = `JWT ${auth.token}`;
  return request(url, newParams);
};

export { secureRequest };

export default request;
