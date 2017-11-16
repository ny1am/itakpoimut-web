import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { get } from 'actions/company';

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
  loggedUser: state.user,
  commentsCount: state.company.commentsCount,
  comments: state.company.comments,
  currentPage: state.company.currentPage,
  totalPages: state.company.totalPages,
});

export default connect(
  mapStateToProps, null
)(Container);
