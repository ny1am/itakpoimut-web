import { connect } from 'react-redux';

import SecureRouteComponent from './SecureRoute';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SecureRouteComponent);
