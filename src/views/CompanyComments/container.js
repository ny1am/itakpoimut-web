import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { get } from 'actions/comments';

import CompanyCommentsComponent from './CompanyComments';

class CompanyCommentsContainer extends React.Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    const { companyId, onLoadComments } = this.props;
    return onLoadComments(companyId).then((payload) => {
      this.setState({ ready: true });
      return payload;
    });
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
  companyId: PropTypes.number.isRequired,
  comments: PropTypes.array,
  onLoadComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  ...state.comments[ownProps.companyId],
});

const mapDispatchToProps = (dispatch) => ({
  onLoadComments: (...args) => dispatch(get(...args)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CompanyCommentsContainer
);
