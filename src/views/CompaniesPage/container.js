import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';

import { get, clearFilters, changeLoyalty, changeCategory, changeViolation } from 'actions/companies';
import { get as getCategories } from 'actions/category';

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
      companiesPromise,
      dispatch(getCategories()),
    ]);
  }

  render() {
    const { currentPage, sortOrder, title } = queryString.parse(this.props.location.search);
    const { filters, initialData, ...props } = this.props;
    return (<CompaniesPageComponent
      {...filters}
      {...initialData}
      {...props}
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
  filters: PropTypes.shape({
    selectedLoyalty: PropTypes.string,
    selectedCategory: PropTypes.string,
    selectedViolations: PropTypes.array,
  }).isRequired,
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

const mapStateToProps = (state) => ({
  filters: state.companies,
  categoriesList: state.category,
});

const mapDispatchToProps = (dispatch) => ({
  onClearFilters: () => dispatch(clearFilters()),
  onLoyaltyChange: (newValue) => dispatch(changeLoyalty(newValue)),
  onCategoryChange: (newValue) => dispatch(changeCategory(newValue)),
  onViolationChange: (newValue) => dispatch(changeViolation(newValue)),
  onRefresh: ({ currentPage, sortOrder, title }) => dispatch(push(`/companies?title=${title}&sortOrder=${sortOrder}&currentPage=${currentPage}#results`)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Container);
