import { connect } from 'react-redux';

import { addComment } from 'actions/company';
import { LOGIN_DIALOG } from 'constants/dialog';
import { showDialog } from 'actions/dialog';

import CompanyCommentsComponent from './CompanyComments';

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (companyId, text) => dispatch(addComment(companyId, text)),
  onLogin: () => dispatch(showDialog(LOGIN_DIALOG)),
  dispatch
});

export default connect(
  null, mapDispatchToProps
)(CompanyCommentsComponent);
