import React from 'react';
import PropTypes from 'prop-types';

import LoginDialog from 'views/LoginDialog';
import SignupDialog from 'views/SignupDialog';
import { LOGIN_DIALOG, SIGNUP_DIALOG } from 'constants/dialog';

const DIALOG_COMPONETS = {
  [LOGIN_DIALOG]: LoginDialog,
  [SIGNUP_DIALOG]: SignupDialog,
};

/**
 * Wrapper for dialogs
 */
const Dialog = ({ dialogType, dialogProps, onClose }) => {
  if (!dialogType) {
    return null;
  }
  const SpecificDialog = DIALOG_COMPONETS[dialogType];
  return (
    <div className="shade">
      <div className="dialog">
        <SpecificDialog {...dialogProps} />
        <button className="dialog_close" onClick={onClose} />
      </div>
    </div>
  );
};

Dialog.propTypes = {
  /**
   * dialog type
   */
  dialogType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  /**
   * Specific dialog props
   */
  dialogProps: PropTypes.object,
  /**
   * dialog close function
   */
  onClose: PropTypes.func.isRequired,
};

export default Dialog;
