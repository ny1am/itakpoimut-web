import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { get, save } from 'actions/userProfile';

import UserProfilePageComponent from './UserProfilePage';

class Container extends React.Component {
  static fetch(match, location, { dispatch }) {
    return dispatch(get());
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      errors: null,
      successSave: false,
      user: props.initialData,
    };
  }

  onSubmit(params) {
    this.props.onSubmit(params).then(data => {
      if (data.successSave) {
        this.setState({
          successSave: true,
          errors: null,
          user: data.user,
        });
      } else {
        this.setState({
          successSave: false,
          errors: data.errors,
        });
      }
      return data;
    });
  }

  render() {
    return <UserProfilePageComponent {...this.props} {...this.state} onSubmit={this.onSubmit} />;
  }
}

Container.propTypes = {
  initialData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (params) => dispatch(save(params)),
  dispatch
});

export default connect(
  null, mapDispatchToProps
)(Container);
