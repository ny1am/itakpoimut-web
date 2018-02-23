import { connect } from 'react-redux';

import SecureRouteComponent from './SecureRoute';

const mapStateToProps = ({ auth }) => ({
  loggedUser: auth.loggedUser,
});

export default connect(mapStateToProps)(SecureRouteComponent);
