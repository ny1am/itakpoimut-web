import { SUCCESS_DIALOG } from 'constants/dialog';
import { get, save } from 'actions/addViolation';
import { showDialog } from 'actions/dialog';
import { genericDialog } from 'components/Dialog';

import AddViolationDialogComponent from './AddViolationDialog';

export default genericDialog({
  fetchFunc: ({ companyId }, { dispatch }) => dispatch(get(companyId)),
  onSubmitFunc: (params, dispatch) => dispatch(save(params)),
  onSubmitSuccess: (dispatch) => dispatch(showDialog(SUCCESS_DIALOG, {
    dialog_title: 'Дякуємо!',
    dialog_body: 'Запит на додання порушення надіслано. Адміністратор розгляне його найближчим часом.',
  })),
  Component: AddViolationDialogComponent,
});
