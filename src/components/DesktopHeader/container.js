import { connect } from 'react-redux';

import { logout } from 'actions/auth';

import DesktopHeaderComponent from './DesktopHeader';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(DesktopHeaderComponent);
