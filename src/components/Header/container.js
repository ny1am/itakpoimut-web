import { connect } from 'react-redux';

import { logout } from 'actions/auth';

import HeaderComponent from './Header';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(HeaderComponent);
