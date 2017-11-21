import { connect } from 'react-redux';

import { LOGIN_DIALOG, SIGNUP_DIALOG } from 'constants/dialog';
import { showDialog } from 'actions/dialog';

import PleaseSignupDialogComponent from './PleaseSignupDialog';

const mapDispatchToProps = (dispatch) => ({
  onLogin: () => dispatch(showDialog(LOGIN_DIALOG)),
  onSignup: () => dispatch(showDialog(SIGNUP_DIALOG)),
  dispatch
});

export default connect(
  null, mapDispatchToProps
)(PleaseSignupDialogComponent);
