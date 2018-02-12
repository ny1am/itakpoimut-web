import { auth, fbAuth } from 'actions/auth';
import { enhanceDialog } from 'components/Dialog';

import LoginDialogComponent from './LoginDialog';

const mapProps = (dispatch) => ({
  onSubmit: (type, ...args) => {
    if (type === 'facebook') {
      return dispatch(fbAuth(...args));
    } else {
      return dispatch(auth(...args));
    }
  },
});

export default enhanceDialog(mapProps)(LoginDialogComponent);
