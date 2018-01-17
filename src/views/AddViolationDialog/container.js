import { get, save } from 'actions/addViolation';
import { enhanceDialog } from 'components/Dialog';

import AddViolationDialogComponent from './AddViolationDialog';

const mapProps = (dispatch) => ({
  onInit: ({ companyId }) => dispatch(get(companyId)),
  onSubmit: (params) => dispatch(save(params)),
  successText: 'Запит на додання порушення надіслано. Адміністратор розгляне його найближчим часом.',
});

export default enhanceDialog(mapProps)(AddViolationDialogComponent);
