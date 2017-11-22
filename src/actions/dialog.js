import {
  SHOW_DIALOG,
  HIDE_DIALOG,
  PLEASE_SIGNUP_DIALOG
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
 * Shows dialog for a logged user, otherwise - shows please signup dialog
 */
export function showProtectedDialog(dialogType, dialogProps) {
  return (dispatch, getState) => {
    if (getState().auth.loggedUser) {
      dispatch({
        type: SHOW_DIALOG,
        dialogType,
        dialogProps
      });
    } else {
      dispatch({
        type: SHOW_DIALOG,
        dialogType: PLEASE_SIGNUP_DIALOG,
      });
    }
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
