import routeConfig from '../routeConfig';
import findRoute from './findRoute';

const matchRoutes = (routeConfig, pathname) => {
  return [{
    route: findRoute(pathname),
    match: {}
  }];
};

const extractFetchConfig = (location, options) => {
  const branch = matchRoutes(routeConfig, location.pathname);
  const fetchResult = branch
    .filter(({ route }) => route && route.component && route.component.fetch)
    .map(({ route, match: { params } }) => {
      return route.component.fetch(location, { ...options, params });
    })
    .reduce((a, b) => a.concat(b), [])
    .filter(result => result);
  if (fetchResult.length > 0) {
    return fetchResult;
  } else {
    return [{
      promise: Promise.resolve()
    }];
  }
};

export default extractFetchConfig;
