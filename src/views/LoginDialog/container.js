import { auth } from 'actions/auth';
import { enhanceDialog } from 'components/Dialog';

import LoginDialogComponent from './LoginDialog';

const mapProps = (dispatch) => ({
  onSubmit: (params) => dispatch(auth(params)),
});

export default enhanceDialog(mapProps)(LoginDialogComponent);
