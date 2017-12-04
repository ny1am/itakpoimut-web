import { get, save } from 'actions/addViolation';
import { enhanceDialog } from 'components/Dialog';

import AddViolationDialogComponent from './AddViolationDialog';

export default enhanceDialog({
  fetchFunc: ({ companyId }, { dispatch }) => dispatch(get(companyId)),
  onSubmitFunc: (params, dispatch) => dispatch(save(params)),
  successText: 'Запит на додання порушення надіслано. Адміністратор розгляне його найближчим часом.',
}, AddViolationDialogComponent);
