import { connect } from 'react-redux';

import { hideDialog } from 'actions/dialog';

import DialogComponent from './Dialog';

const mapStateToProps = (state) => {
  const dialogState = state.router.location.state || {};
  return {
    loggedUser: state.auth.loggedUser,
    dialogType: dialogState.dialogType,
    dialogProps: dialogState.dialogProps,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(hideDialog()),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogComponent);
