import { TOKEN } from 'constants';
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
