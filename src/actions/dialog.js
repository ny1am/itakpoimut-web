import { push } from 'react-router-redux';

import { history } from '../store/configureStore';

/**
 * Shows dialog
 */
export function showDialog(dialogType) {
  const newLocation = {
    ...history.location,
    state: { dialogType }
  };
  return push(newLocation);
}

/**
 * Hides dialog
 */
export function hideDialog() {
  return showDialog(null);
}
