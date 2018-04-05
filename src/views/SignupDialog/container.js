import { signup } from 'actions/signup';
import { auth, fbAuth, googleAuth } from 'actions/auth';
import { hideDialog } from 'actions/dialog';
import { enhanceView } from 'components/Dialog';

import SignupDialogComponent from './SignupDialog';

const mapProps = (dispatch) => ({
  onSubmit: (type, data) => {
    if (type === 'facebook') {
      return dispatch(fbAuth(data));
    } else if (type === 'google') {
      return dispatch(googleAuth(data));
    } else {
      const { email, password } = data;
      return dispatch(signup(data)).then(data => {
        if (data.result === 'success') {
          return dispatch(auth({ username: email, password }));
        }
        return data;
      });
    }
  },
  onSuccess: () => dispatch(hideDialog()),
});

export default enhanceView(mapProps)(SignupDialogComponent);
