import { connect } from 'react-redux';

import MainMenuComponent from './MainMenu';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

export default connect(
  mapStateToProps, null
)(MainMenuComponent);
