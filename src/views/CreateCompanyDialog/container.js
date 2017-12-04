import { SUCCESS_DIALOG } from 'constants/dialog';
import { get, save } from 'actions/createCompany';
import { showDialog } from 'actions/dialog';
import { genericDialog } from 'components/Dialog';

import CreateCompanyDialogComponent from './CreateCompanyDialog';

export default genericDialog({
  fetchFunc: (dialogProps, { dispatch }) => dispatch(get()),
  onSubmitFunc: (params, dispatch) => dispatch(save(params)),
  onSubmitSuccess: (dispatch) => dispatch(showDialog(SUCCESS_DIALOG, {
    dialog_title: 'Дякуємо!',
    dialog_body: 'Запит на створення компанії надіслано. Адміністратор розгляне його найближчим часом.',
  })),
  Component: CreateCompanyDialogComponent,
});
