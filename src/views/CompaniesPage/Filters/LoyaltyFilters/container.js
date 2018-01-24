import { connect } from 'react-redux';

import { changeLoyalty } from 'actions/companies';

import LoyaltyFiltersComponent from './LoyaltyFilters';

const mapStateToProps = ({ companies }) => ({
  value: companies.selectedLoyalty,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (value) => dispatch(changeLoyalty(value)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(LoyaltyFiltersComponent);
