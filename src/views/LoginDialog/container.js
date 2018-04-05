import { push } from 'react-router-redux';

import { auth, fbAuth, googleAuth } from 'actions/auth';
import { hideDialog } from 'actions/dialog';
import { enhanceView } from 'components/View';

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
  onSuccess: ({ viewMode }) => {
    if (viewMode === 'dialog') {
      return dispatch(hideDialog());
    } else {
      return dispatch(push('/'));
    }
  },
});

export default enhanceView(mapProps)(LoginDialogComponent);
