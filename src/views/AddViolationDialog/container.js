import { get as getViolations } from 'actions/violation';
import { get } from 'actions/company';
import { save } from 'actions/addViolation';
import { enhanceDialog } from 'components/Dialog';

import AddViolationDialogComponent from './AddViolationDialog';

const mapProps = (dispatch) => ({
  onInit: ({ companyId }) => {
    return [{
      prop: 'company',
      promise: dispatch(get(companyId))
    }, {
      prop: 'violationsList',
      promise: dispatch(getViolations())
    }];
  },
  onSubmit: (params) => dispatch(save(params)),
  successText: 'Запит на додання порушення надіслано. Адміністратор розгляне його найближчим часом.',
});

export default enhanceDialog(mapProps)(
  AddViolationDialogComponent
);
