import { connect } from 'react-redux';

import { LOGIN_DIALOG } from 'constants/dialog';
import { showDialog } from 'actions/dialog';
import { logout } from 'actions/auth';

import MobileHeaderComponent from './MobileHeader';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: () => dispatch(showDialog(LOGIN_DIALOG)),
  onLogout: () => dispatch(logout()),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(MobileHeaderComponent);
