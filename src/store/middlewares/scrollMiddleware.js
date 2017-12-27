import { PRELOAD_LOCATION_CHANGE_END } from 'constants';
import { urlHash } from 'utils';

export default () => next => action => {
  if (!action) {
    return;
  }

  if (action.type === PRELOAD_LOCATION_CHANGE_END && action.preloadType === 'page' && action.prevRoute !== action.route) {
    const idToScroll = urlHash(action.route);
    if (idToScroll) {
      (document.getElementById(idToScroll) || document.body).scrollIntoView();
    } else {
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
