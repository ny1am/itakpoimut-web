function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }
  return null;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 500) {
    return response.json().then((errorData) => {
      const message = (errorData || {}).error;
      const error = new TypeError(message || 'Server error');
      throw error;
    });
  }
  return response.json().then((errorData) => {
    //todo: revise this
    const error = Object.assign({ status_code: response.status }, errorData);
    throw error;
  });
}

const request = (url, params) => {
  return fetch(url, params)
    .then(checkStatus)
    .then(parseJSON);
};

export default request;
