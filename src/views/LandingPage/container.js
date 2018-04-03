import React from 'react';
import { connect } from 'react-redux';

import { get as getCategories } from 'actions/category';

import LandingPageComponent from './LandingPage';

class LandingPageContainer extends React.Component {
  static fetch(location, { dispatch }) {
    return [{
      promise: dispatch(getCategories())
    }];
  }
  render() {
    return <LandingPageComponent {...this.props} />;
  }
}

const mapStateToProps = ({ category }) => ({
  categoriesList: category,
});

export default connect(mapStateToProps)(LandingPageContainer);
