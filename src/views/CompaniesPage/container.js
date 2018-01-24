import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';

import {
  get, changeLoyalty, changeCategory, addViolationFilter, removeViolationFilter
} from 'actions/companies';
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
  selectedLoyalty: PropTypes.string,
  selectedCategory: PropTypes.string,
  selectedViolations: PropTypes.arrayOf(PropTypes.string),
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

const mapStateToProps = ({ companies, category, violation }) => ({
  selectedLoyalty: companies.selectedLoyalty,
  selectedCategory: companies.selectedCategory,
  selectedViolations: companies.selectedViolations,
  categoriesList: category,
  violationsList: violation
});

const mapDispatchToProps = (dispatch) => ({
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
