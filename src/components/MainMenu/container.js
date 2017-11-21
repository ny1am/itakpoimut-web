import { connect } from 'react-redux';

import { PLEASE_SIGNUP_DIALOG } from 'constants/dialog';
import { showDialog } from 'actions/dialog';

import MainMenuComponent from './MainMenu';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onAddCompany: () => dispatch(showDialog(PLEASE_SIGNUP_DIALOG)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(MainMenuComponent);
