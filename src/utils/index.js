import { matchRoutes } from 'react-router-config';

import { singleText as loyaltySingleText } from 'shared/js/loyalties';
import { text as violationText } from 'shared/js/violations';
import { text as categoryText } from 'shared/js/categories';

export const roleModerator = (user) => {
  return user && user.roles.indexOf('moderator') !== -1;
};

export const loyaltySingleByName = (name) => {
  return loyaltySingleText(name);
};

export const violationByName = (name) => {
  return violationText(name);
};

export const categoryByName = (name) => {
  return categoryText(name);
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
  if (branch.length > 0) {
    const promises = branch
      .filter(({ route }) => route.component && route.component.fetch)
      .map(({ route, match }) => {
        return route.component.fetch(match, location, options);
      });
    if (promises && promises.length > 0) {
      return Promise.all(promises);
    } else {
      return null;
    }
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
