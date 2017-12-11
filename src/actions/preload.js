import { PRELOAD_LOCATION_CHANGE_START, PRELOAD_LOCATION_CHANGE_END } from 'constants';

export const start =({ preloadType = 'page', instant = false, prevPathname, pathname }) => ({
  type: PRELOAD_LOCATION_CHANGE_START,
  preloadType,
  instant,
  prevPathname,
  pathname
});

export const end =({ preloadType = 'page', instant = false, prevPathname, pathname }) => ({
  type: PRELOAD_LOCATION_CHANGE_END,
  preloadType,
  instant,
  prevPathname,
  pathname
});
