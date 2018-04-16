import { resetPassword } from 'actions/resetPassword';
import { enhanceView } from 'components/View';

import ResetPasswordPageComponent from './ResetPasswordPage';
import SuccessView from './SuccessView';

const mapProps = (dispatch) => ({
  onSubmit: (...args) => dispatch(resetPassword(...args)),
  onSuccess: ({ showSuccessView }) => showSuccessView(SuccessView),
});

export default enhanceView(mapProps)(ResetPasswordPageComponent);
