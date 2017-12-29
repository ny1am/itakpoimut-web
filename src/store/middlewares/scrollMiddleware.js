import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

import { PRELOAD_LOCATION_CHANGE_END } from 'constants';

export default () => next => action => {
  if (!action) {
    return;
  }

  if (action.type === PRELOAD_LOCATION_CHANGE_END && action.preloadType === 'page') {
    const idToScroll = action.hash;
    if (idToScroll) {
      scrollIntoViewIfNeeded(document.getElementById(idToScroll.slice(1)) || document.body);
    } else if (action.prevRoute !== action.route) {
      window.scrollTo(0, 0);
    }
  }

  if (action.type === PRELOAD_LOCATION_CHANGE_END && action.preloadType === 'dialog') {
    //scroll dialog to top
    const dialog = document.getElementById('dialog');
    if (dialog) {
      dialog.scrollTop = 0;
    }
  }

  return next(action);
};
