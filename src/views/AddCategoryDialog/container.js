import { SUCCESS_DIALOG } from 'constants/dialog';
import { get, save } from 'actions/addCategory';
import { showDialog } from 'actions/dialog';
import { genericDialog } from 'components/Dialog';

import AddCategoryDialogComponent from './AddCategoryDialog';

export default genericDialog({
  fetchFunc: ({ companyId }, { dispatch }) => dispatch(get(companyId)),
  onSubmitFunc: (params, dispatch) => dispatch(save(params)),
  onSubmitSuccess: (dispatch) => dispatch(showDialog(SUCCESS_DIALOG, {
    dialog_title: 'Дякуємо!',
    dialog_body: 'Запит на додання сфери надіслано. Адміністратор розгляне його найближчим часом.',
  })),
  Component: AddCategoryDialogComponent,
});