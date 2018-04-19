import { createSelectorCreator, defaultMemoize } from 'reselect';

import { clearDialog } from 'utils';
import { extractDialogLocation } from 'components/Dialog';

// ignore dialog state when comparing page location
const equalityCheck = (nextLocation, prevLocation) => {
  const prevDialog = extractDialogLocation(prevLocation);
  const nextDialog = extractDialogLocation(nextLocation);
  return nextLocation === prevLocation || prevDialog !== nextDialog;
};

const createIgnoreDialogSelector = createSelectorCreator(
  defaultMemoize,
  equalityCheck
);

const getRouterLocation = (state) => state.router.location;

export const pageLocationSelector = createIgnoreDialogSelector(
  [getRouterLocation],
  (location) => clearDialog(location)
);
