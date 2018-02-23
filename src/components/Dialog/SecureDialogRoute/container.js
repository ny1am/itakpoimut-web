import { connect } from 'react-redux';

import SecureDialogRouteComponent from './SecureDialogRoute';

const mapStateToProps = ({ auth }) => ({
  loggedUser: auth.loggedUser,
});

export default connect(mapStateToProps)(SecureDialogRouteComponent);
