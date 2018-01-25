import { save } from 'actions/addCategory';
import { get } from 'actions/company';
import { get as getCategories } from 'actions/category';
import { enhanceDialog } from 'components/Dialog';

import AddCategoryDialogComponent from './AddCategoryDialog';

const mapProps = (dispatch) => ({
  onInit: ({ companyId }) => {
    return [{
      prop: 'company',
      promise: dispatch(get(companyId))
    }, {
      prop: 'categoriesList',
      promise: dispatch(getCategories())
    }];
  },
  onSubmit: (params) => dispatch(save(params)),
  successText: 'Запит на додання сфери надіслано. Адміністратор розгляне його найближчим часом.',
});

export default enhanceDialog(mapProps)(
  AddCategoryDialogComponent
);
