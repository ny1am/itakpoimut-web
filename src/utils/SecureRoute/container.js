import { connect } from 'react-redux';

import SecureRouteComponent from './SecureRoute';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

export default connect(mapStateToProps)(SecureRouteComponent);
