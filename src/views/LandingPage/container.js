import React from 'react';
import { connect } from 'react-redux';

import { get } from 'actions/landing';
import { CREATE_COMPANY_DIALOG } from 'constants/dialog';
import { showProtectedDialog } from 'actions/dialog';

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

const mapDispatchToProps = (dispatch) => ({
  onCreateCompany: () => dispatch(showProtectedDialog(CREATE_COMPANY_DIALOG)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Container);
