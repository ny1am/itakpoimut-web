import React from 'react';
import PropTypes from 'prop-types';

import PleaseSignupDialog from 'components/PleaseSignupDialog';
import SuccessDialog from 'components/SuccessDialog';
import LoginDialog from 'views/LoginDialog';
import SignupDialog from 'views/SignupDialog';
import CreateCompanyDialog from 'views/CreateCompanyDialog';
import AddViolationDialog from 'views/AddViolationDialog';
import AddCategoryDialog from 'views/AddCategoryDialog';
import { LOGIN_DIALOG, SIGNUP_DIALOG, PLEASE_SIGNUP_DIALOG, CREATE_COMPANY_DIALOG, ADD_VIOLATION_DIALOG, ADD_CATEGORY_DIALOG, SUCCESS_DIALOG } from 'constants/dialog';

const DIALOG_COMPONETS = {
  [PLEASE_SIGNUP_DIALOG]: {
    component: PleaseSignupDialog,
  },
  [SUCCESS_DIALOG]: {
    component: SuccessDialog,
  },

  [LOGIN_DIALOG]: {
    component: LoginDialog,
  },
  [SIGNUP_DIALOG]: {
    component: SignupDialog,
  },
  [CREATE_COMPANY_DIALOG]: {
    component: CreateCompanyDialog,
    secure: true,
  },
  [ADD_VIOLATION_DIALOG]: {
    component: AddViolationDialog,
    secure: true,
  },
  [ADD_CATEGORY_DIALOG]: {
    component: AddCategoryDialog,
    secure: true,
  },
};

/**
 * Wrapper for dialogs
 */
class Dialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAppFetching: false,
      initialData: null,
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.dialogType === nextProps.dialogType || !nextProps.dialogType) {
     return;
    }
    this.fetchInitialData(nextProps);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !nextState.isAppFetching;
  }

  fetchInitialData (props) {
    const { dispatch, dialogType, dialogProps } = props;
    this.setState({
      isAppFetching: true,
      appFetchingError: null,
      initialData: null,
    });
    const component = DIALOG_COMPONETS[dialogType].component;
    const promise = component.fetch ? component.fetch(dialogProps, { dispatch }) : Promise.resolve();
    promise.then((data) => {
      const initialData = data ? data.payload : null;
      this.setState({
        isAppFetching: false,
        initialData,
      });
    })
    .catch((err) => {
      this.setState({
        isAppFetching: false,
        appFetchingError: err
      });
    });
  }

  render() {
    const { dialogType, dialogProps, loggedUser, onClose } = this.props;
    if (!dialogType) {
      return null;
    }
    const route = DIALOG_COMPONETS[dialogType];
    const SpecificDialog = (route.secure&&!loggedUser)?PleaseSignupDialog:route.component;
    return (
      <div className="shade">
        <div className="dialog">
          <SpecificDialog {...dialogProps} initialData={this.state.initialData} />
          <button className="dialog_close" onClick={onClose} />
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
  /**
   * logged user
   */
  loggedUser: PropTypes.object,
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
