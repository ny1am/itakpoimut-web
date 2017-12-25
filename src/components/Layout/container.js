import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LayoutComponent from './Layout';

class LayoutContainer extends React.Component {

  componentDidMount() {
    if (this.props.overflowShown) {
      document.body.style.overflowY = 'hidden';
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.overflowShown && nextProps.overflowShown) {
      //dialog has been shown
      document.body.style.overflowY = 'hidden';
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.overflowShown && !this.props.overflowShown) {
      //dialog has been hidden
      document.body.style.overflowY = '';
    }
  }

  render() {
    return <LayoutComponent {...this.props} />;
  }
}

LayoutContainer.propTypes = {
  overflowShown: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const dialogState = state.router.location.state || {};
  const dialogShown = !!dialogState.dialogType;
  const menuShown = state.menu;
  return {
    overflowShown: (dialogShown || menuShown),
  };
};

export default connect(mapStateToProps)(LayoutContainer);
