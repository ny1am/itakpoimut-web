import { changePassword } from 'actions/changePassword';
import { enhanceView } from 'components/Dialog';

import ChangePasswordDialogComponent from './ChangePasswordDialog';
import SuccessView from './SuccessView';

const mapProps = (dispatch) => ({
  onSubmit: (...args) => dispatch(changePassword(...args)),
  onSuccess: (showSuccessView) => showSuccessView(SuccessView),
});

export default enhanceView(mapProps)(ChangePasswordDialogComponent);
