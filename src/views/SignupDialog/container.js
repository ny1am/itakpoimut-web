import { signup } from 'actions/signup';
import { auth } from 'actions/auth';
import { enhanceDialog } from 'components/Dialog';

import SignupDialogComponent from './SignupDialog';

export default enhanceDialog({
  onSubmit: ({ fname, lname, email, password }, dispatch) => dispatch(signup({ fname, lname, email, password })).then(data => {
    if (data.payload.result === 'success') {
      return dispatch(auth({ username: email, password }));
    }
    return data;
  }),
}, SignupDialogComponent);
