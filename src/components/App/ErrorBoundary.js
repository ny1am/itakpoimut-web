import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';

import { hideDialog } from 'actions/dialog';

class ErrorBoundary extends React.Component {

  componentDidCatch(error, info) {
    //todo: persist error
    console.log('did catch', error, info); // eslint-disable-line
    const { dispatch } = this.context.store;
    dispatch(hideDialog());
    dispatch(push({
      pathname: '/oops',
    }));
  }

  render() {
    return this.props.children;
  }
}

ErrorBoundary.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;