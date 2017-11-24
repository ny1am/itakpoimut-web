import { push } from 'react-router-redux';

/**
 * Shows dialog
 */
export function showDialog(dialogType, dialogProps) {
  return push({
    state: {
      dialogType,
      dialogProps
    }
  });
}

/**
 * Hides dialog
 */
export function hideDialog() {
  return showDialog(null);
}
