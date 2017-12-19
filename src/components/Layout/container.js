import { connect } from 'react-redux';

import LayoutComponent from './Layout';

const mapStateToProps = (state) => {
  const dialogState = state.router.location.state || {};
  const dialogShown = !!dialogState.dialogType;
  const menuShown = state.menu;
  return {
    dialogShown: (dialogShown || menuShown),
  };
};

export default connect(mapStateToProps)(LayoutComponent);
