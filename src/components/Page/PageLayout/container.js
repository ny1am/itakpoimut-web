import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { isDialogShownSelector } from 'components/Dialog';

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

const isMenuShownSelector = state => state.menu;
const isOverflowShownSelector = createSelector(
  [isDialogShownSelector, isMenuShownSelector],
  (dialogShown, menuShown) => (dialogShown || menuShown)
);

const mapStateToProps = (state) => ({
  overflowShown: isOverflowShownSelector(state),
});

export default connect(mapStateToProps)(PageLayoutContainer);
