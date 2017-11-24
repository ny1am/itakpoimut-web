import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signup } from 'actions/signup';
import { auth } from 'actions/auth';
import { hideDialog } from 'actions/dialog';

import SignupDialogComponent from './SignupDialog';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      errors: null,
    };
  }

  //todo refactor this
  onSubmit({ fname, lname, email, password }) {
    this.props.onSubmit({ fname, lname, email, password }).then(data => {
      if (data.payload.result === 'success') {
        this.props.dispatch(auth(email, password)).then(data => {
          if (data.payload.result === 'success') {
            this.props.dispatch(hideDialog());
          }
        });
      } else if (data.payload.result === 'error') {
        this.setState({
          errors: data.payload.errors
        });
      }
    });
  }

  render() {
    return <SignupDialogComponent {...this.props} {...this.state} onSubmit={this.onSubmit} />;
  }
}

Container.propTypes = {
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data) => dispatch(signup(data)),
  dispatch
});

export default connect(
  null, mapDispatchToProps
)(Container);
