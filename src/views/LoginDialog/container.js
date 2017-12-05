import { auth } from 'actions/auth';
import { enhanceDialog } from 'components/Dialog';

import LoginDialogComponent from './LoginDialog';

export default enhanceDialog({
  onSubmit: (params, dispatch) => dispatch(auth(params)),
}, LoginDialogComponent);
