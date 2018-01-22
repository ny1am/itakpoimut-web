import { connect } from 'react-redux';

import { save } from 'actions/addCategory';
import { get } from 'actions/company';
import { get as getCategories } from 'actions/category';
import { enhanceDialog } from 'components/Dialog';

import AddCategoryDialogComponent from './AddCategoryDialog';

const mapProps = (dispatch) => ({
  onInit: ({ companyId }) => {
    return Promise.all([
      dispatch(get(companyId)),
      dispatch(getCategories()),
    ]);
  },
  onSubmit: (params) => dispatch(save(params)),
  successText: 'Запит на додання сфери надіслано. Адміністратор розгляне його найближчим часом.',
});

const mapStateToProps = (state, ownProps) => ({
  categoriesList: state.category,
  company: state.company[ownProps.companyId],
});

export default enhanceDialog(mapProps)(
  connect(mapStateToProps)(AddCategoryDialogComponent)
);
