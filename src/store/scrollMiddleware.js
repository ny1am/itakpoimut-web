import { PRELOAD_LOCATION_CHANGE_END } from 'constants';

export default () => next => action => {
  if (!action) {
    return;
  }

  if (action.type === PRELOAD_LOCATION_CHANGE_END && action.preloadType === 'page' && action.prevRoute !== action.route) {
    window.scrollTo(0, 0);
  }

  if (action.type === PRELOAD_LOCATION_CHANGE_END && action.preloadType === 'dialog') {
    //scroll dialog to top
    document.getElementById('dialog').scrollTop = 0;
  }

  return next(action);
};
