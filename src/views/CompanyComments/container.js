import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { wrapWithProgress } from 'components/ProgressBar';
import { pageLocationSelector } from 'components/Page';
import { get } from 'actions/comments';

import CompanyCommentsComponent from './CompanyComments';

const getCurrentPage = (location) => {
  const { currentPage } = queryString.parse(location.search);
  return currentPage || '1';
};

class CompanyCommentsContainer extends React.Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    const { companyId, onInit } = this.props;
    const currentPage = getCurrentPage(this.props.location);
    return onInit(companyId, currentPage).then((payload) => {
      this.setState({ ready: true });
      return payload;
    });
  }

  componentWillReceiveProps(newProps) {
    const { companyId, onInit } = newProps;
    const currentPage = getCurrentPage(this.props.location);
    const newPage = getCurrentPage(newProps.location);
    //todo: revise this
    if (currentPage !== newPage && newProps.location.hash !== '#new-comment') {
      const promise = onInit(companyId, newPage);
      return wrapWithProgress(promise);
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.comments !== nextProps.comments || !this.state.ready;
  }

  render() {
    if (!this.state.ready) {
      //todo: add some loading indicator here
      return null;
    }
    return <CompanyCommentsComponent {...this.props} />;
  }
}

CompanyCommentsContainer.propTypes = {
  location: PropTypes.object.isRequired,
  companyId: PropTypes.number.isRequired,
  comments: PropTypes.array,
  onInit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  location: pageLocationSelector(state),
  commentsCount: state.comments.commentsCount,
  comments: state.comments.comments,
  currentPage: state.comments.currentPage,
  totalPages: state.comments.totalPages,
});

const mapDispatchToProps = (dispatch) => ({
  onInit: (companyId, currentPage) => dispatch(get(companyId, currentPage)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CompanyCommentsContainer
);
