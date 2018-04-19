import { connect } from 'react-redux';

import { hideDialog } from 'actions/dialog';

import DialogLayoutComponent from './DialogLayout';

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(hideDialog()),
  dispatch,
});

export default connect(null, mapDispatchToProps)(DialogLayoutComponent);
