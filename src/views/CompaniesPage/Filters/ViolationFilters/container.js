import { connect } from 'react-redux';

import { addViolationFilter, removeViolationFilter } from 'actions/companies';

import ViolationFiltersComponent from './ViolationFilters';

const mapStateToProps = ({ companies, violation }) => ({
  value: companies.selectedViolations,
  list: violation,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (checked, value) => {
    const action = checked ? addViolationFilter : removeViolationFilter;
    return dispatch(action(value));
  },
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  Object.assign({}, stateProps, dispatchProps, ownProps, {
    onChange: (...args) => {
      dispatchProps.onChange(...args);
      ownProps.onChange();
    }
  })
);

export default connect(
  mapStateToProps, mapDispatchToProps, mergeProps
)(ViolationFiltersComponent);
