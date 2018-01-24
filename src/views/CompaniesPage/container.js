import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'react-router-redux';
import queryString from 'query-string';

import { get, clearFilters, changeLoyalty, changeCategory, addViolationFilter, removeViolationFilter } from 'actions/companies';
import { get as getCategories } from 'actions/category';
import { get as getViolations } from 'actions/violation';
import loyalty from 'utils/enums/loyalty';

import CompaniesPageComponent from './CompaniesPage';

class Container extends React.Component {
  static fetch(match, location, { store, dispatch }) {
    const { title, currentPage, sortOrder, selectedCategory } = queryString.parse(location.search);
    //sync with redux store
    selectedCategory && dispatch(changeCategory(selectedCategory));
    const filters = store.getState().companies;
    const companiesPromise = dispatch(get({
      title,
      currentPage,
      sortOrder,
      filters,
    }));
    return Promise.all([
      dispatch(getCategories()),
      dispatch(getViolations()),
      companiesPromise,
    ]);
  }

  render() {
    const { currentPage, sortOrder, title } = queryString.parse(this.props.location.search);
    const { initialData, ...props } = this.props;
    return (<CompaniesPageComponent
      {...initialData}
      {...props}
      loyaltiesList={loyalty}
      title={title}
      currentPage={Number(currentPage || 1)}
      sortOrder={sortOrder || 'asc'}
    />);
  }
}


Container.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  selectedLoyalty: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  selectedCategory: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  selectedViolations: PropTypes.array,
  initialData: PropTypes.shape({
    companiesCount: PropTypes.number,
    companies: PropTypes.array,
    allCompaniesCount: PropTypes.number,
    recordsPerPage: PropTypes.number,
    totalPages: PropTypes.number,
    violationsList: PropTypes.array,
    loyaltiesList: PropTypes.array,
    categoriesList: PropTypes.array,
  })
};

const getAllViolations = state => state.violation;
const getSelectedViolations = state => state.companies.selectedViolations;

export const violationSelector = createSelector(
  [ getAllViolations, getSelectedViolations ],
  (violations, selectedViolations) => {
    return selectedViolations.map(
      name => violations.find(v => v.name === name)
    );
  }
);

const mapStateToProps = (state) => {
  const { companies, category, violation } = state;
  const { selectedLoyalty, selectedCategory } = companies;
  const result = {
    selectedLoyalty: loyalty.find(l => l.name === selectedLoyalty),
    selectedCategory: category.find(c => c.name === selectedCategory),
    selectedViolations: violationSelector(state),
    categoriesList: category,
    violationsList: violation
  };
  return result;
};

const mapDispatchToProps = (dispatch) => ({
  onClearFilters: () => dispatch(clearFilters()),
  onLoyaltyChange: (newValue) => dispatch(changeLoyalty(newValue)),
  onCategoryChange: (newValue) => dispatch(changeCategory(newValue)),
  onAddViolationFilter: (value) => dispatch(addViolationFilter(value)),
  onRemoveViolationFilter: (value) => dispatch(removeViolationFilter(value)),
  onRefresh: ({ currentPage, sortOrder, title }) => dispatch(push(
    `/companies?title=${title}&sortOrder=${sortOrder}&currentPage=${currentPage}#results`
  )),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
