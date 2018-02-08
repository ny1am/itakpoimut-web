import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

import { PRELOAD_LOCATION_CHANGED } from 'consts';

export default () => next => action => {

  const { type, location, prevLocation } = action;
  if (type === PRELOAD_LOCATION_CHANGED) {
    const idToScroll = location.hash;
    if (idToScroll) {
      const el = document.getElementById(idToScroll.slice(1)) || document.body;
      scrollIntoViewIfNeeded(el);
    //todo: revise this condition
    } else if (location.pathname !== (prevLocation||{}).pathname) {
      window.scrollTo(0, 0);
    }
  }

  return next(action);
};
