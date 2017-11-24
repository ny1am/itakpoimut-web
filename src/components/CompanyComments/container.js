import { connect } from 'react-redux';

import { addComment } from 'actions/company';

import CompanyCommentsComponent from './CompanyComments';

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (companyId, text) => dispatch(addComment(companyId, text)),
  dispatch
});

export default connect(
  null, mapDispatchToProps
)(CompanyCommentsComponent);
