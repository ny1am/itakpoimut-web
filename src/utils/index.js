import { matchRoutes } from 'react-router-config';

export const roleModerator = (user) => {
  return user && user.roles.indexOf('moderator') !== -1;
};

export const http = (url) => {
  //todo revise this hotfix
  if (url.indexOf('http') === 0) {
    return url;
  } else {
    return 'http://'+url;
  }
};

export const reactRouterFetch = (routes, location, options) => {
  const branch = matchRoutes(routes, location.pathname);
  const promises = branch
    .filter(({ route }) => route.component && route.component.fetch)
    .map(({ route, match }) => {
      return route.component.fetch(match, location, options);
    })
    .filter(promise => promise);
  if (promises && promises.length > 0) {
    return Promise.all(promises);
  } else {
    return null;
  }
};

/**
* checkes wheather route has been changed, with dialogs being not taken in care of.
*/
export const hasPageLocationChanged = (prevLocation, nextLocation) => {
  const currentDialog = (prevLocation.state || {}).dialogType;
  const nextDialog = (nextLocation.state || {}).dialogType;
  return (prevLocation !== nextLocation && currentDialog == nextDialog);
};

export const getDisplayName = (Component) => (
  Component.displayName || Component.name || 'Component'
);

export const wrapWithSideEffect = (sideEffect, delay) => (promise) => {
  const timer = setTimeout(sideEffect, delay);
  return promise.finally(() => {
    clearTimeout(timer);
  });
};

export const extractFetchData = (data) => {
  if (!data) {
    return null;
  } else if (data instanceof Array) {
    return data.reduce((result, requestData) => {
      return Object.assign({}, result, requestData);
    }, {});
  } else {
    return data;
  }
};

export const keyValueToObjectReducer = (result, { key, value }) => (
  Object.assign(result, {[key] : value})
);
