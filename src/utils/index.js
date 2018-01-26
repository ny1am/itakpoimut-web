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

export const keyValueToObjectReducer = (result, { key, value }) => (
  Object.assign(result, {[key] : value})
);

export const extractInitialData = (names, values) => {
  const initialData = values
    .map((value, index) => ({
      key: names[index],
      value
    }))
    .filter(item => item.key)
    .reduce(keyValueToObjectReducer, {});
  return initialData;
};
