import { scrollIntoViewIfNeeded } from 'scroll-into-view-if-needed';

import { PRELOAD_LOCATION_CHANGE_END } from 'constants';

export default () => next => action => {

  const { type, preloadType, hash, prevRoute, route } = action;
  if (type === PRELOAD_LOCATION_CHANGE_END && preloadType === 'page') {
    const idToScroll = hash;
    if (idToScroll) {
      const el = document.getElementById(idToScroll.slice(1)) || document.body;
      scrollIntoViewIfNeeded(el);
    } else if (prevRoute !== route) {
      window.scrollTo(0, 0);
    }
  }

  return next(action);
};
