import { connect } from 'react-redux';

import SecureDialogRouteComponent from './SecureDialogRoute';

const mapStateToProps = ({ auth }) => ({
  loggedUser: auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SecureDialogRouteComponent);
