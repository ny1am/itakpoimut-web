import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { get } from 'actions/landing';
import { get as getCategories } from 'actions/category';

import LandingPageComponent from './LandingPage';

class Container extends React.Component {
  static fetch(match, location, { dispatch }) {
    return [{
      prop: 'landingData',
      promise: dispatch(get()),
    }, {
      promise: dispatch(getCategories())
    }];
  }
  render() {
    const { initialData, ...rest } = this.props;
    return <LandingPageComponent {...rest} {...initialData.landingData} />;
  }
}

Container.propTypes = {
  initialData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  categoriesList: state.category,
});

export default connect(mapStateToProps)(Container);
