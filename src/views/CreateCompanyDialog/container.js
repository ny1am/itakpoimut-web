import { get, save } from 'actions/createCompany';
import { enhanceDialog } from 'components/Dialog';

import CreateCompanyDialogComponent from './CreateCompanyDialog';

const mapProps = (dispatch) => ({
  onInit: () => dispatch(get()),
  onSubmit: (params) => dispatch(save(params)),
  successText: 'Запит на створення компанії надіслано. Адміністратор розгляне його найближчим часом.',
});

export default enhanceDialog(mapProps)(CreateCompanyDialogComponent);
