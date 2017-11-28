import React from 'react';
import PropTypes from 'prop-types';

import { get } from 'actions/landing';

import LandingPageComponent from './LandingPage';

class Container extends React.Component {
  static fetch(match, location, { dispatch }) {
    return dispatch(get());
  }
  render() {
    const { initialData, ...rest } = this.props;
    return <LandingPageComponent {...rest} {...initialData} />;
  }
}

Container.propTypes = {
  initialData: PropTypes.object,
};

export default Container;
