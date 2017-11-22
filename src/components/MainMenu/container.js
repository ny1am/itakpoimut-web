import { connect } from 'react-redux';

import { CREATE_COMPANY_DIALOG } from 'constants/dialog';
import { showDialog } from 'actions/dialog';

import MainMenuComponent from './MainMenu';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onCreateCompany: () => dispatch(showDialog(CREATE_COMPANY_DIALOG)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(MainMenuComponent);
