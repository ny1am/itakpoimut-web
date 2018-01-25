import { get as getCategories } from 'actions/category';
import { get as getViolations } from 'actions/violation';
import { save } from 'actions/createCompany';
import { enhanceDialog } from 'components/Dialog';

import CreateCompanyDialogComponent from './CreateCompanyDialog';

const mapProps = (dispatch) => ({
  onInit: () => {
    return [{
      prop: 'categoriesList',
      promise: dispatch(getCategories())
    }, {
      prop: 'violationsList',
      promise: dispatch(getViolations())
    }];
  },
  onSubmit: (params) => dispatch(save(params)),
  successText: 'Запит на створення компанії надіслано. Адміністратор розгляне його найближчим часом.',
});

export default enhanceDialog(mapProps)(
  CreateCompanyDialogComponent
);
