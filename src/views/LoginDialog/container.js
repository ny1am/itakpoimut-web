import { auth } from 'actions/auth';
import { genericDialog } from 'components/Dialog';

import LoginDialogComponent from './LoginDialog';

export default genericDialog({
  onSubmitFunc: (params, dispatch) => dispatch(auth(params)),
  Component: LoginDialogComponent,
});
