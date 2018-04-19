import { connect } from 'react-redux';

import { changeCategory } from 'actions/companies';

import CategoryFiltersComponent from './CategoryFilters';

const mapStateToProps = ({ companies, category }) => ({
  value: companies.selectedCategory,
  list: category,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (checked, value) => {
    const newValue = checked ? value : null;
    return dispatch(changeCategory(newValue));
  },
  dispatch,
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps, {
    onChange: (...args) => {
      dispatchProps.onChange(...args);
      ownProps.onChange();
    },
  });

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  CategoryFiltersComponent
);
