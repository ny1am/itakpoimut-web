import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { get } from 'actions/company';
import { showProtectedDialog } from 'actions/dialog';
import { ADD_VIOLATION_DIALOG, ADD_CATEGORY_DIALOG } from 'constants/dialog';

import CompanyPageComponent from './CompanyPage';

class Container extends React.Component {
  static fetch({ params }, location, { dispatch }) {
    const { currentPage } = queryString.parse(location.search);
    return dispatch(get(params.id, currentPage));
  }
  render() {
    return <CompanyPageComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  company: state.company.company,
  loggedUser: state.auth.loggedUser,
  commentsCount: state.company.commentsCount,
  comments: state.company.comments,
  currentPage: state.company.currentPage,
  totalPages: state.company.totalPages,
});

const mapDispatchToProps = (dispatch) => ({
  onAddViolation: (companyId) => dispatch(showProtectedDialog(ADD_VIOLATION_DIALOG, {companyId})),
  onAddCategory: (companyId) => dispatch(showProtectedDialog(ADD_CATEGORY_DIALOG, {companyId})),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Container);
