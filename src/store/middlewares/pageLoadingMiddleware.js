import Progress from 'react-progress-2';

import { PRELOAD_LOCATION_CHANGE_START, PRELOAD_LOCATION_CHANGE_END } from 'constants';

export default () => next => action => {

  if (action.type === PRELOAD_LOCATION_CHANGE_START && !action.instant) {
    try {
      Progress.show();
    } catch(e) {
      // do nothing; todo: use another lib for a progress component
    }
  }

  if (action.type === PRELOAD_LOCATION_CHANGE_END && !action.instant) {
    Progress.hide();
  }

  return next(action);
};
