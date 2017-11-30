import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { auth } from 'actions/auth';
import { hideDialog } from 'actions/dialog';

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
    this.props.changeLoading(true);
    this.props.onSubmit(...params).then(data => {
      this.props.changeLoading(false);
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
  changeLoading: PropTypes.func,
  dispatch: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, password) => dispatch(auth(username, password)),
  dispatch
});

export default connect(
  null, mapDispatchToProps
)(Container);
