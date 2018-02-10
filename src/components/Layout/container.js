import { connect } from 'react-redux';

import LayoutComponent from './Layout';

const mapStateToProps = (state) => {
  //todo: move dialog logic to HOC maybe
  const dialogState = state.router.location.state || {};
  const dialogShown = !!dialogState.dialogType;
  const menuShown = state.menu;
  return {
    overflowShown: (dialogShown || menuShown),
  };
};

export default connect(mapStateToProps)(LayoutComponent);
