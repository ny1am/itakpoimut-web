import errorsEnum from 'utils/enums/errors';

export { default as scrollIntoViewIfNeeded } from './scrollIntoViewIfNeeded';

export const roleModerator = (user) => {
  return user && user.roles.indexOf('moderator') !== -1;
};

export const http = (url) => {
  //todo revise this hotfix
  if (url.indexOf('http') === 0) {
    return url;
  } else {
    return 'http://' + url;
  }
};

export const getDisplayName = (Component) =>
  Component.displayName || Component.name || 'Component';

export const wrapWithSideEffect = (sideEffect, delay) => (promise) => {
  const timer = setTimeout(sideEffect, delay);
  return promise.finally(() => {
    clearTimeout(timer);
  });
};

export const keyValueToObjectReducer = (result, { key, value }) =>
  Object.assign(result, { [key]: value });

export const preventDefault = (fn, ...args) => (event) => {
  event.preventDefault();
  return fn(...args);
};

export const getFirstErrorElement = (errors, holder = document) => {
  if (errors !== null && typeof errors === 'object') {
    const keys = Object.keys(errors);
    if (keys && keys.length > 0) {
      const firstName = keys[0];
      const element = holder.querySelector(`[name="${firstName}"]`);
      if (element) {
        return element.parentElement || element;
      }
    }
  }
  return null;
};

export function clearDialog(location) {
  const clearedState = Object.assign({}, location.state, { dialog: null });
  return Object.assign({}, location, {
    state: clearedState,
  });
}

export function processErrors(errors) {
  if (errors) {
    const result = {};
    Object.keys(errors).forEach((key) => {
      const value = errors[key];
      result[key] = errorsEnum[value] || value;
    });
    return result;
  }
  return errors;
}
