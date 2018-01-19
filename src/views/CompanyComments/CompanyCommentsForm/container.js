import { connect } from 'react-redux';

import { add } from 'actions/comments';

import CompanyCommentsFormComponent from './CompanyCommentsForm';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (companyId, text) => dispatch(add(companyId, text)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(CompanyCommentsFormComponent);
