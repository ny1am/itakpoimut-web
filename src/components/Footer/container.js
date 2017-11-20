import { connect } from 'react-redux';

import FooterComponent from './Footer';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

export default connect(
  mapStateToProps, null
)(FooterComponent);
