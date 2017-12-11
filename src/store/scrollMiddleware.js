import { PRELOAD_LOCATION_CHANGE_END } from 'constants';

export default () => next => action => {
  if (!action) {
    return;
  }

  if (action.type === PRELOAD_LOCATION_CHANGE_END && action.preloadType === 'page' && action.prevPathname !== action.pathname) {
    window.scrollTo(0, 0);
  }

  return next(action);
};
