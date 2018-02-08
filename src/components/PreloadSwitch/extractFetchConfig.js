import { matchRoutes } from 'react-router-config';

const extractFetchConfig = (routes, location, options) => {
  const branch = matchRoutes(routes, location.pathname);
  const fetchResult = branch
    .filter(({ route }) => route.component && route.component.fetch)
    .map(({ route, match }) => {
      return route.component.fetch(match, location, options);
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
