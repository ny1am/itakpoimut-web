import { forgetPassword } from 'actions/forgetPassword';
import { enhanceDialog } from 'components/Dialog';

import ForgetPasswordDialogComponent from './ForgetPasswordDialog';
import SuccessDialog from './SuccessDialog';

const mapProps = (dispatch) => ({
  onSubmit: (...args) => dispatch(forgetPassword(...args)),
  SuccessDialog,
});

export default enhanceDialog(mapProps)(ForgetPasswordDialogComponent);
