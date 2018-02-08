import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getLastComments, getNewCompanies } from 'actions/landing';
import { get as getCategories } from 'actions/category';

import LandingPageComponent from './LandingPage';

class Container extends React.Component {
  static fetch(location, { dispatch }) {
    return [{
      prop: 'newCompanies',
      promise: dispatch(getNewCompanies()),
    },{
      prop: 'comments',
      promise: dispatch(getLastComments()),
    }, {
      promise: dispatch(getCategories())
    }];
  }
  render() {
    const { initialData, ...rest } = this.props;
    return <LandingPageComponent {...rest} {...initialData} />;
  }
}

Container.propTypes = {
  initialData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  categoriesList: state.category,
});

export default connect(mapStateToProps)(Container);
