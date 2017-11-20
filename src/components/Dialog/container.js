import { connect } from 'react-redux';

import { hideDialog } from 'actions/dialog';

import DialogComponent from './Dialog';

const mapStateToProps = (state) => ({
  dialogType: state.dialog.dialogType,
  dialogProps: state.dialog.dialogProps,
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(hideDialog()),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogComponent);
