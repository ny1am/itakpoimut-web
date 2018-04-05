import { auth, fbAuth, googleAuth } from 'actions/auth';
import { hideDialog } from 'actions/dialog';
import { enhanceView } from 'components/Dialog';

import LoginDialogComponent from './LoginDialog';

const mapProps = (dispatch) => ({
  onSubmit: (type, ...args) => {
    if (type === 'facebook') {
      return dispatch(fbAuth(...args));
    } else if (type === 'google') {
      return dispatch(googleAuth(...args));
    } else {
      return dispatch(auth(...args));
    }
  },
  onSuccess: () => dispatch(hideDialog()),
});

export default enhanceView(mapProps)(LoginDialogComponent);
