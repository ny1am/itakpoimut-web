import { changePassword } from 'actions/changePassword';
import { enhanceDialog } from 'components/Dialog';

import ChangePasswordDialogComponent from './ChangePasswordDialog';
import SuccessView from './SuccessView';

const mapProps = (dispatch) => ({
  onSubmit: (...args) => dispatch(changePassword(...args)),
  SuccessView
});

export default enhanceDialog(mapProps)(ChangePasswordDialogComponent);
