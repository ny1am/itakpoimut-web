import { signup } from 'actions/signup';
import { auth } from 'actions/auth';
import { enhanceDialog } from 'components/Dialog';

import SignupDialogComponent from './SignupDialog';

const props = {
  onSubmit: ({ email, password, ...passThrough }, dispatch) => dispatch(signup({ email, password, ...passThrough })).then(data => {
    if (data.result === 'success') {
      return dispatch(auth({ username: email, password }));
    }
    return data;
  }),
};

export default enhanceDialog(props)(SignupDialogComponent);
