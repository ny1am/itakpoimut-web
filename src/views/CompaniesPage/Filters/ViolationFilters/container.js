import { connect } from 'react-redux';

import { addViolationFilter, removeViolationFilter } from 'actions/companies';

import ViolationFiltersComponent from './ViolationFilters';

const mapStateToProps = ({ companies, violation }) => ({
  value: companies.selectedViolations,
  list: violation,
});

const mapDispatchToProps = (dispatch) => ({
  onAddViolationFilter: (value) => dispatch(addViolationFilter(value)),
  onRemoveViolationFilter: (value) => dispatch(removeViolationFilter(value)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(ViolationFiltersComponent);
