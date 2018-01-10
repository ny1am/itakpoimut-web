import { get, save } from 'actions/createCompany';
import { enhanceDialog } from 'components/Dialog';

import CreateCompanyDialogComponent from './CreateCompanyDialog';

const props = {
  onInit: (dialogProps, dispatch) => dispatch(get()),
  onSubmit: (params, dispatch) => dispatch(save(params)),
  successText: 'Запит на створення компанії надіслано. Адміністратор розгляне його найближчим часом.',
};

export default enhanceDialog(props)(CreateCompanyDialogComponent);
