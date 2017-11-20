import { connect } from 'react-redux';

import MobileMenuComponent from './MobileMenu';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

export default connect(
  mapStateToProps, null
)(MobileMenuComponent);
