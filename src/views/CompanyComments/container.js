import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { wrapWithProgress } from 'components/ProgressBar';
import { get } from 'actions/comments';
import CompanyCommentsComponent from './CompanyComments';

const getCurrentPage = (location) => {
  const { currentPage } = queryString.parse(location.search);
  return currentPage;
};

class CompanyCommentsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    const { companyId, onInit } = this.props;
    const currentPage = getCurrentPage(this.props.location);
    return onInit(companyId, currentPage).then(payload => {
      this.setState({ ready: true });
      return payload;
    });
  }

  componentWillReceiveProps(newProps) {
    const { companyId, onInit } = newProps;
    const currentPage = getCurrentPage(this.props.location);
    const newPage = getCurrentPage(newProps.location);
    if (currentPage !== newPage) {
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
  commentsCount: state.comments.commentsCount,
  comments: state.comments.comments,
  currentPage: state.comments.currentPage,
  totalPages: state.comments.totalPages,
});

const mapDispatchToProps = (dispatch) => ({
  onInit: (companyId, currentPage) => dispatch(get(companyId, currentPage)),
  dispatch
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CompanyCommentsContainer)
);
