import { auth } from 'actions/auth';
import { enhanceDialog } from 'components/Dialog';

import LoginDialogComponent from './LoginDialog';

const props = {
  onSubmit: (params, dispatch) => dispatch(auth(params)),
};

export default enhanceDialog(props)(LoginDialogComponent);
