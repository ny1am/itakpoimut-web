import React from 'react';
import { connect } from 'react-redux';

import { get } from 'actions/landing';

import LandingPageComponent from './LandingPage';

class Container extends React.Component {
  static fetch(match, location, { dispatch }) {
    return dispatch(get());
  }
  render() {
    return <LandingPageComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  newCompanies: state.landing.newCompanies,
  comments: state.landing.comments,
});

export default connect(
  mapStateToProps, null
)(Container);
