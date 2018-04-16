import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { resetPassword } from 'actions/resetPassword';

import ResetPasswordPageComponent from './ResetPasswordPage';
import ResetPasswordPageWrapper from './ResetPasswordPageWrapper';
import SuccessView from './SuccessView';

class ResetPasswordPageContainer extends React.PureComponent {

  state = {
    success: false,
    errors: {}
  }

  onSubmit = (password) => {
    const { token } = this.props.match.params;
    this.props.onSubmit({ token, password }).then(() => {
      this.setState({ success: true });
    }).catch(({ errors }) => {
      this.setState({ errors });
    });
  }

  render() {
    const { success, errors } = this.state;
    return (
      <ResetPasswordPageWrapper>
        {success ?
          <SuccessView />
        :
          <ResetPasswordPageComponent
            errors={errors}
            onSubmit={this.onSubmit}
          />
        }
      </ResetPasswordPageWrapper>
    );
  }
}

ResetPasswordPageContainer.propTypes = {
  match: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (...args) => dispatch(resetPassword(...args)),
  dispatch
});

export default connect(null, mapDispatchToProps)(
  ResetPasswordPageContainer
);
