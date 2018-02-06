import { changePassword } from 'actions/changePassword';
import { enhanceDialog } from 'components/Dialog';

import ChangePasswordDialogComponent from './ChangePasswordDialog';

const mapProps = (dispatch) => ({
  onSubmit: (...args) => dispatch(changePassword(...args)),
  successTitle: 'Вітаємо!',
  successText: 'Ваш пароль успішно змінено.',
});

export default enhanceDialog(mapProps)(ChangePasswordDialogComponent);
