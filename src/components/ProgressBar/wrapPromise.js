import Progress from 'react-progress-2';

import { wrapWithSideEffect } from 'utils';

const PROGRESS_DELAY = 20;

const showProgress = () => {
  try {
    Progress.show();
  } catch(e) {
    // do nothing; todo: use another lib for a progress component
  }
};

const hideProgress = Progress.hide;

const wrapPromise = (promise) => {
  return wrapWithSideEffect(showProgress, PROGRESS_DELAY)(promise)
    .finally(hideProgress);
};

export default wrapPromise;
