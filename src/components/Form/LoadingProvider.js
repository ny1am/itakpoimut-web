import React from 'react';
import PropTypes from 'prop-types';

//todo: not sure if it's needed
class LoadingProvider extends React.Component {

  state = {
    loading: false,
  }

  getChildContext = () => ({
    loading: this.state.loading,
    changeLoading: this.changeLoading,
  });

  changeLoading = (loading) => {
    this.setState({ loading });
  };

  render() {
    return this.props.children;
  }
}

LoadingProvider.childContextTypes = {
  loading: PropTypes.bool.isRequired,
  changeLoading: PropTypes.func.isRequired,
};

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoadingProvider;
