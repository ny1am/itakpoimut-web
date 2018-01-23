import { push } from 'react-router-redux';

import { history } from '../store/configureStore';

/**
 * Shows dialog
 */
export function showDialog(dialogType, dialogProps) {
  const newLocation = {
    ...history.location,
    state: { dialogType, dialogProps }
  };
  return push(newLocation);
}

/**
 * Hides dialog
 */
export function hideDialog() {
  return showDialog(null);
}
