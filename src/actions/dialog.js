import {
  SHOW_DIALOG,
  HIDE_DIALOG,
} from 'constants/dialog';

/**
 * Shows dialog
 */
export function showDialog(dialogType, dialogProps) {
  return {
    type: SHOW_DIALOG,
    dialogType,
    dialogProps
  };
}

/**
 * Hides dialog
 */
export function hideDialog() {
  return {
    type: HIDE_DIALOG,
  };
}
