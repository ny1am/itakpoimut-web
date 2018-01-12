import { TOKEN } from 'constants';
import { loadAuth } from '../store/storage';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, params) {
  if (params && params[TOKEN]) {
    const auth = loadAuth() || {};
    params.headers || (params.headers = {});
    params.headers['Authorization'] = `JWT ${auth.token}`;
  }
  return fetch(url, params)
    .then(checkStatus)
    .then(parseJSON);
}
