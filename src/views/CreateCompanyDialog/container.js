import { connect } from 'react-redux';

import { get as getCategories } from 'actions/category';
import { get as getViolations } from 'actions/violation';
import { save } from 'actions/createCompany';
import { enhanceDialog } from 'components/Dialog';

import CreateCompanyDialogComponent from './CreateCompanyDialog';

const mapProps = (dispatch) => ({
  onInit: () => {
    return Promise.all([
      dispatch(getCategories()),
      dispatch(getViolations()),
    ]);
  },
  onSubmit: (params) => dispatch(save(params)),
  successText: 'Запит на створення компанії надіслано. Адміністратор розгляне його найближчим часом.',
});

const mapStateToProps = (state) => ({
  categoriesList: state.category,
  violationsList: state.violation,
});

export default enhanceDialog(mapProps)(
  connect(mapStateToProps)(CreateCompanyDialogComponent)
);
