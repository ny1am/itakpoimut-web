import { connect } from 'react-redux';

import LayoutComponent from './Layout';

const mapStateToProps = (state) => {
  const dialogState = state.router.location.state || {};
  return {
    dialogShown: !!dialogState.dialogType,
    appReady: state.global.appReady,
  };
};

export default connect(mapStateToProps)(LayoutComponent);
