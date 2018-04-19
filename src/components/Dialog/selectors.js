import { createSelector } from 'reselect';

import { extractDialogLocation } from './utils';

const getRouterLocation = (state) => state.router.location;

export const dialogLocationSelector = createSelector(
  [getRouterLocation],
  extractDialogLocation
);

export const isDialogShownSelector = createSelector(
  [dialogLocationSelector],
  (dialogLocation) => !!dialogLocation
);
