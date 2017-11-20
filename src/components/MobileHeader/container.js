import { connect } from 'react-redux';

import MobileHeaderComponent from './MobileHeader';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

export default connect(
  mapStateToProps, null
)(MobileHeaderComponent);
