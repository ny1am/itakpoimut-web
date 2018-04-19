import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
  clearFilters,
  changeLoyalty,
  changeCategory,
  removeViolationFilter,
} from 'actions/companies';
import loyalties from 'utils/enums/loyalty';
import SelectedFiltersComponent from './SelectedFilters';

const getSelectedLoyalty = (state) =>
  loyalties.find((l) => l.name === state.companies.selectedLoyalty);

const getAllCategories = (state) => state.category;
const getSelectedCategoryName = (state) => state.companies.selectedCategory;
const getSelectedCategory = createSelector(
  [getAllCategories, getSelectedCategoryName],
  (categories, selectedCategory) =>
    categories.find((c) => c.name === selectedCategory)
);

const getAllViolations = (state) => state.violation;
const getSelectedViolationNames = (state) => state.companies.selectedViolations;
const getSelectedViolations = createSelector(
  [getAllViolations, getSelectedViolationNames],
  (violations, selectedViolations) =>
    selectedViolations.map((name) => violations.find((v) => v.name === name))
);

const mapStateToProps = (state) => ({
  selectedLoyalty: getSelectedLoyalty(state),
  selectedCategory: getSelectedCategory(state),
  selectedViolations: getSelectedViolations(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClearFilters: () => dispatch(clearFilters()),
  onLoyaltyChange: (newValue) => dispatch(changeLoyalty(newValue)),
  onCategoryChange: (newValue) => dispatch(changeCategory(newValue)),
  onRemoveViolationFilter: (value) => dispatch(removeViolationFilter(value)),
  dispatch,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { selectedLoyalty, selectedCategory, selectedViolations } = stateProps;
  const {
    onLoyaltyChange,
    onCategoryChange,
    onRemoveViolationFilter,
    onClearFilters,
  } = dispatchProps;
  const filters = [];
  selectedLoyalty &&
    filters.push({
      text: selectedLoyalty.text,
      onRemove: () => onLoyaltyChange(null),
    });
  selectedCategory &&
    filters.push({
      text: selectedCategory.text,
      onRemove: () => onCategoryChange(null),
    });
  filters.push(
    ...selectedViolations.map((violation) => ({
      text: violation.text,
      onRemove: () => onRemoveViolationFilter(violation.name),
    }))
  );
  return Object.assign({}, ownProps, {
    filters,
    onRemoveAll: () => onClearFilters(),
  });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  SelectedFiltersComponent
);
