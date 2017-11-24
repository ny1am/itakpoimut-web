import React from 'react';
import PropTypes from 'prop-types';

//todo: move to components
import PleaseSignupDialog from 'views/PleaseSignupDialog';
import SuccessDialog from 'components/SuccessDialog';
import LoginDialog from 'views/LoginDialog';
import SignupDialog from 'views/SignupDialog';
import CreateCompanyDialog from 'views/CreateCompanyDialog';
import AddViolationDialog from 'views/AddViolationDialog';
import AddCategoryDialog from 'views/AddCategoryDialog';
import { LOGIN_DIALOG, SIGNUP_DIALOG, PLEASE_SIGNUP_DIALOG, CREATE_COMPANY_DIALOG, ADD_VIOLATION_DIALOG, ADD_CATEGORY_DIALOG, SUCCESS_DIALOG } from 'constants/dialog';

const DIALOG_COMPONETS = {
  [PLEASE_SIGNUP_DIALOG]: PleaseSignupDialog,
  [SUCCESS_DIALOG]: SuccessDialog,

  [LOGIN_DIALOG]: LoginDialog,
  [SIGNUP_DIALOG]: SignupDialog,
  [CREATE_COMPANY_DIALOG]: CreateCompanyDialog,
  [ADD_VIOLATION_DIALOG]: AddViolationDialog,
  [ADD_CATEGORY_DIALOG]: AddCategoryDialog,
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
