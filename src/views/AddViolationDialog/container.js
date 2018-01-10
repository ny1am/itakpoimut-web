import { get, save } from 'actions/addViolation';
import { enhanceDialog } from 'components/Dialog';

import AddViolationDialogComponent from './AddViolationDialog';

const props = {
  onInit: ({ companyId }, dispatch) => dispatch(get(companyId)),
  onSubmit: (params, dispatch) => dispatch(save(params)),
  successText: 'Запит на додання порушення надіслано. Адміністратор розгляне його найближчим часом.',
};

export default enhanceDialog(props)(AddViolationDialogComponent);
