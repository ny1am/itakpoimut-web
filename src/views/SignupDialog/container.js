import { signup } from 'actions/signup';
import { auth } from 'actions/auth';
import { enhanceDialog } from 'components/Dialog';

import SignupDialogComponent from './SignupDialog';

const mapProps = (dispatch) => ({
  onSubmit: ({ email, password, ...passThrough }) => dispatch(signup({ email, password, ...passThrough })).then(data => {
    if (data.result === 'success') {
      return dispatch(auth({ username: email, password }));
    }
    return data;
  }),
});

export default enhanceDialog(mapProps)(SignupDialogComponent);
