import { signup } from 'actions/signup';
import { auth, fbAuth, googleAuth } from 'actions/auth';
import { enhanceDialog } from 'components/Dialog';

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
});

export default enhanceDialog(mapProps)(SignupDialogComponent);
