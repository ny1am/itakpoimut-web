import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageLayoutComponent from './PageLayout';

class PageLayoutContainer extends React.Component {
  render() {
    const { loading } = this.context;
    return <PageLayoutComponent loading={loading} {...this.props} />;
  }
}

PageLayoutContainer.contextTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  //todo: move dialog logic to HOC maybe
  const dialogState = state.router.location.state || {};
  const dialogShown = !!dialogState.dialogType;
  const menuShown = state.menu;
  return {
    overflowShown: (dialogShown || menuShown),
  };
};

export default connect(mapStateToProps)(PageLayoutContainer);
