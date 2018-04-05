import { forgetPassword } from 'actions/forgetPassword';
import { enhanceView } from 'components/View';

import ForgetPasswordDialogComponent from './ForgetPasswordDialog';
import SuccessView from './SuccessView';

const mapProps = (dispatch) => ({
  onSubmit: (...args) => dispatch(forgetPassword(...args)),
  onSuccess: ({ showSuccessView }) => showSuccessView(SuccessView),
});

export default enhanceView(mapProps)(ForgetPasswordDialogComponent);
