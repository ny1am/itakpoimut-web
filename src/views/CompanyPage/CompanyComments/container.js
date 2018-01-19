import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
//todo: refactor according to Dependency Inversion
import Progress from 'react-progress-2';

import { get, add } from 'actions/comments';
import CompanyCommentsComponent from './CompanyComments';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    const { location, onInit } = this.props;
    const companyId = this.props.company._id;
    const { currentPage } = queryString.parse(location.search);
    return onInit(companyId, currentPage).then(payload => {
      this.setState({ ready: true });
      return payload;
    });
  }

  componentWillReceiveProps(newProps) {
    const oldProps = this.props;
    const { location, onInit } = newProps;
    const companyId = oldProps.company._id;
    const { currentPage } = queryString.parse(oldProps.location.search);
    const newPage = queryString.parse(location.search).currentPage;
    if (currentPage !== newPage) {
      Progress.show();
      return onInit(companyId, newPage).then(payload => {
        Progress.hide();
        return payload;
      });
    }
  }

  render() {
    if (!this.state.ready) {
      //todo: add some loading indicator here
      return null;
    }
    return <CompanyCommentsComponent {...this.props} />;
  }

}

Container.propTypes = {
  location: PropTypes.object.isRequired,
  company: PropTypes.shape({
    _id: PropTypes.number.isRequired,
  }).isRequired,
  onInit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  commentsCount: state.company.commentsCount,
  comments: state.company.comments,
  currentPage: state.company.currentPage,
  totalPages: state.company.totalPages,
});

const mapDispatchToProps = (dispatch) => ({
  onInit: (companyId, currentPage) => dispatch(get(companyId, currentPage)),
  onSubmit: (companyId, text) => dispatch(add(companyId, text)),
  dispatch
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Container)
);
