import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { add } from 'actions/comments';
import { wrapWithProgress } from 'components/ProgressBar';

import CompanyCommentsFormComponent from './CompanyCommentsForm';

class CompanyCommentsFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      text: '',
    };
  }

  onTextChange(text) {
    this.setState({ text });
  }

  onSubmit() {
    const { onSubmit, companyId } = this.props;
    const { text } = this.state;
    const promise = onSubmit(companyId, text).then(data => {
      //todo: slight performance issue here
      this.setState({ text: '' });
      return data;
    });
    return wrapWithProgress(promise);
  }

  render() {
    const { text } = this.state;
    const { loggedUser } = this.props;
    return (
      <CompanyCommentsFormComponent
        text={text}
        loggedUser={loggedUser}
        onTextChange={this.onTextChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

CompanyCommentsFormContainer.propTypes = {
  loggedUser: PropTypes.object,
  companyId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (companyId, text) => dispatch(add(companyId, text)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(CompanyCommentsFormContainer);
