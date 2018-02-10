import { changePassword } from 'actions/changePassword';
import { enhanceDialog } from 'components/Dialog';

import ChangePasswordDialogComponent from './ChangePasswordDialog';
import SuccessDialog from './SuccessDialog';

const mapProps = (dispatch) => ({
  onSubmit: (...args) => dispatch(changePassword(...args)),
  SuccessDialog,
});

export default enhanceDialog(mapProps)(ChangePasswordDialogComponent);
