import { connect } from 'react-redux';

import { changeLoyalty } from 'actions/companies';

import LoyaltyFiltersComponent from './LoyaltyFilters';

const mapStateToProps = ({ companies }) => ({
  value: companies.selectedLoyalty,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (checked, value) => {
    const newValue = checked ? value : null;
    return dispatch(changeLoyalty(newValue));
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
  LoyaltyFiltersComponent
);
