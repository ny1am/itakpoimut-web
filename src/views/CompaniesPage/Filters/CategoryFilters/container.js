import { connect } from 'react-redux';

import { changeCategory } from 'actions/companies';

import CategoryFiltersComponent from './CategoryFilters';

const mapStateToProps = ({ companies, category }) => ({
  value: companies.selectedCategory,
  list: category,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (value) => dispatch(changeCategory(value)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(CategoryFiltersComponent);
