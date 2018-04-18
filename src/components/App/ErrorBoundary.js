import React from 'react';
import PropTypes from 'prop-types';

import ErrorPage from './ErrorPage';

class ErrorBoundary extends React.Component {

  state = {
    error: false
  }

  componentDidCatch(error, info) {
    this.setState({ error: true });
    //todo: persist error
    console.log('did catch', error, info); // eslint-disable-line
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <ErrorPage />;
    } else {
      return this.props.children;
    }
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
