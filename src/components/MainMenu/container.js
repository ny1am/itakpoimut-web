import { connect } from 'react-redux';

import { CREATE_COMPANY_DIALOG } from 'constants/dialog';
import { showProtectedDialog } from 'actions/dialog';

import MainMenuComponent from './MainMenu';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onCreateCompany: () => dispatch(showProtectedDialog(CREATE_COMPANY_DIALOG)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(MainMenuComponent);
