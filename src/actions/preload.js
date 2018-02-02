import { PRELOAD_LOCATION_CHANGE_START, PRELOAD_LOCATION_CHANGE_END } from 'consts';

export const start =({ prevRoute, route, hash }) => ({
  type: PRELOAD_LOCATION_CHANGE_START,
  prevRoute,
  route,
  hash
});

export const end =({ prevRoute, route, hash }) => ({
  type: PRELOAD_LOCATION_CHANGE_END,
  prevRoute,
  route,
  hash
});
