import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { get, addComment, getComments } from 'actions/company';

import CompanyPageComponent from './CompanyPage';

class Container extends React.Component {
  static fetch({ params }, location, { dispatch, prevLocation }) {
    const { currentPage } = queryString.parse(location.search);
    const promises = [];
    if (!prevLocation || location.pathname !== prevLocation.pathname) {
      promises.push(dispatch(get(params.id)));
    }
    promises.push(dispatch(getComments(params.id, currentPage)));
    return Promise.all(promises);
  }
  render() {
    return <CompanyPageComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  company: state.company.company,
  commentsCount: state.company.commentsCount,
  comments: state.company.comments,
  currentPage: state.company.currentPage,
  totalPages: state.company.totalPages,
});

const mapDispatchToProps = (dispatch) => ({
  onAddComment: (companyId, text) => dispatch(addComment(companyId, text)),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
