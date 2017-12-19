import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const loadingRoot = document.getElementById('loading');
const appRoot = document.getElementById('app');

class Loading extends React.Component {

  componentDidUpdate(prevProps) {
    if (!prevProps.appReady && this.props.appReady) {
      appRoot.classList.add('ready');
      loadingRoot.classList.add('loading-hidden');
    }
  }

  render() {
    return null;
  }
}

Loading.propTypes = {
  appReady: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  appReady: state.global.appReady,
});

export default connect(mapStateToProps)(Loading);
