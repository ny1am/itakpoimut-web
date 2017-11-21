import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { auth } from 'actions/auth';
import { SIGNUP_DIALOG } from 'constants/dialog';
import { showDialog, hideDialog } from 'actions/dialog';

import LoginDialogComponent from './LoginDialog';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      errors: null,
    };
  }

  onSubmit(...params) {
    this.props.onSubmit(...params).then(data => {
      if (data.payload.result === 'success') {
        this.props.dispatch(hideDialog());
      } else if (data.payload.result === 'error') {
        this.setState({
          errors: data.payload.errors
        });
      }
    });
  }

  render() {
    return <LoginDialogComponent {...this.props} {...this.state} onSubmit={this.onSubmit} />;
  }
}

Container.propTypes = {
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, password) => dispatch(auth(username, password)),
  onSignup: () => dispatch(showDialog(SIGNUP_DIALOG)),
  dispatch
});

export default connect(
  null, mapDispatchToProps
)(Container);