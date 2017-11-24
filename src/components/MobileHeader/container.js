import { connect } from 'react-redux';

import { LOGIN_DIALOG, CREATE_COMPANY_DIALOG } from 'constants/dialog';
import { showDialog, showProtectedDialog } from 'actions/dialog';
import { logout } from 'actions/auth';

import MobileHeaderComponent from './MobileHeader';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: () => dispatch(showDialog(LOGIN_DIALOG)),
  onLogout: () => dispatch(logout()),
  onCreateCompany: () => dispatch(showProtectedDialog(CREATE_COMPANY_DIALOG)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(MobileHeaderComponent);
