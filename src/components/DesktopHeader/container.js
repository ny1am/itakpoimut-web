import { connect } from 'react-redux';

import { LOGIN_DIALOG } from 'constants/dialog';
import { showDialog } from 'actions/dialog';

import DesktopHeaderComponent from './DesktopHeader';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: () => dispatch(showDialog(LOGIN_DIALOG)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(DesktopHeaderComponent);
