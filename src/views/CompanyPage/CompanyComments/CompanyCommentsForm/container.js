import { connect } from 'react-redux';

import CompanyCommentsFormComponent from './CompanyCommentsForm';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

export default connect(
  mapStateToProps
)(CompanyCommentsFormComponent);
