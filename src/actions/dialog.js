import { push } from 'react-router-redux';

import { clearDialog } from 'utils';
import { history } from '../store/configureStore';

function getSavedLocation() {
  const browserLocation = history.location;
  let savedLocation;
  if (browserLocation.state && browserLocation.state.dialog) {
    savedLocation = browserLocation.state.dialog.savedLocation;
  }
  return savedLocation || browserLocation;
}

/**
 * Shows dialog
 */
export function showDialog(location) {
  const savedLocation = getSavedLocation();
  const dialog = {
    savedLocation: clearDialog(savedLocation),
  };
  return push({
    pathname: location,
    state: { dialog },
  });
}

/**
 * Hides dialog
 */
export function hideDialog() {
  const savedLocation = getSavedLocation();
  return push(clearDialog(savedLocation));
}
