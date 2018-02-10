import { connect } from 'react-redux';

import { hideDialog } from 'actions/dialog';

import DialogWrapperComponent from './DialogWrapper';

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(hideDialog()),
  dispatch
});

export default connect(null, mapDispatchToProps)(DialogWrapperComponent);
