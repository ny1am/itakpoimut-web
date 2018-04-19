import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { isDialogShownSelector } from 'components/Dialog';

import PageLayoutComponent from './PageLayout';

const isMenuShownSelector = (state) => state.menu;
const isOverflowShownSelector = createSelector(
  [isDialogShownSelector, isMenuShownSelector],
  (dialogShown, menuShown) => dialogShown || menuShown
);

const mapStateToProps = (state) => ({
  overflowShown: isOverflowShownSelector(state),
});

export default connect(mapStateToProps)(PageLayoutComponent);
