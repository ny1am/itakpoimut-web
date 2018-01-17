import { get, save } from 'actions/addCategory';
import { enhanceDialog } from 'components/Dialog';

import AddCategoryDialogComponent from './AddCategoryDialog';

const mapProps = (dispatch) => ({
  onInit: ({ companyId }) => dispatch(get(companyId)),
  onSubmit: (params) => dispatch(save(params)),
  successText: 'Запит на додання сфери надіслано. Адміністратор розгляне його найближчим часом.',
});

export default enhanceDialog(mapProps)(AddCategoryDialogComponent);
