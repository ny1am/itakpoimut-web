import { forgetPassword } from 'actions/forgetPassword';
import { enhanceDialog } from 'components/Dialog';

import ForgetPasswordDialogComponent from './ForgetPasswordDialog';
import SuccessView from './SuccessView';

const mapProps = (dispatch) => ({
  onSubmit: (...args) => dispatch(forgetPassword(...args)),
  SuccessView,
});

export default enhanceDialog(mapProps)(ForgetPasswordDialogComponent);
