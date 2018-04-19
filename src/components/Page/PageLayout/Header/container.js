import { connect } from 'react-redux';

import { logout } from 'actions/auth';
import * as menu from 'actions/menu';

import HeaderComponent from './Header';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
  onMenuShow: () => dispatch(menu.show()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
