import { signup } from 'actions/signup';
import { auth } from 'actions/auth';
import { hideDialog } from 'actions/dialog';
import { enhanceDialog } from 'components/Dialog';

import SignupDialogComponent from './SignupDialog';

export default enhanceDialog({
  onSubmitFunc: ({ fname, lname, email, password }, dispatch) => dispatch(signup({ fname, lname, email, password })).then(data => {
    if (data.payload.result === 'success') {
      return dispatch(auth({ username: email, password })).then(data => {
        if (data.payload.result === 'success') {
          return dispatch(hideDialog());
        }
        return data;
      });
    }
    return data;
  }),
}, SignupDialogComponent);
