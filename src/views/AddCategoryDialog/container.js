import { get, save } from 'actions/addCategory';
import { enhanceDialog } from 'components/Dialog';

import AddCategoryDialogComponent from './AddCategoryDialog';

const props = {
  onInit: ({ companyId }, dispatch) => dispatch(get(companyId)),
  onSubmit: (params, dispatch) => dispatch(save(params)),
  successText: 'Запит на додання сфери надіслано. Адміністратор розгляне його найближчим часом.',
};

export default enhanceDialog(props)(AddCategoryDialogComponent);
