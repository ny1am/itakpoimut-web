import React from 'react';
import { connect } from 'react-redux';

import { get, save } from 'actions/userProfile';

import UserProfilePageComponent from './UserProfilePage';

class Container extends React.Component {
  static fetch(match, location, { dispatch }) {
    return dispatch(get());
  }
  render() {
    return <UserProfilePageComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  user: state.userProfile.user,
  errors: state.userProfile.errors,
  successSave: state.userProfile.successSave,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (params) => dispatch(save(params)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Container);
