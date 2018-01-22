import { connect } from 'react-redux';

import { get as getViolations } from 'actions/violation';
import { get } from 'actions/company';
import { save } from 'actions/addViolation';
import { enhanceDialog } from 'components/Dialog';

import AddViolationDialogComponent from './AddViolationDialog';

const mapProps = (dispatch) => ({
  onInit: ({ companyId }) => {
    return Promise.all([
      dispatch(get(companyId)),
      dispatch(getViolations())
    ]);
  },
  onSubmit: (params) => dispatch(save(params)),
  successText: 'Запит на додання порушення надіслано. Адміністратор розгляне його найближчим часом.',
});

const mapStateToProps = (state, ownProps) => ({
  violationsList: state.violation,
  company: state.company[ownProps.companyId],
});

export default enhanceDialog(mapProps)(
  connect(mapStateToProps)(AddViolationDialogComponent)
);
