import { PRELOAD_LOCATION_CHANGE_START, PRELOAD_LOCATION_CHANGE_END } from 'constants';

export const start =({ preloadType = 'page', instant = false, prevRoute, route, hash }) => ({
  type: PRELOAD_LOCATION_CHANGE_START,
  preloadType,
  instant,
  prevRoute,
  route,
  hash
});

export const end =({ preloadType = 'page', instant = false, prevRoute, route, hash }) => ({
  type: PRELOAD_LOCATION_CHANGE_END,
  preloadType,
  instant,
  prevRoute,
  route,
  hash
});
