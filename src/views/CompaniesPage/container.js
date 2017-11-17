import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { get } from 'actions/companies';

import CompaniesPageComponent from './CompaniesPage';

class Container extends React.Component {
  static fetch(match, location, { dispatch }) {
    const { currentPage, sortOrder } = queryString.parse(location.search);
    return dispatch(get(currentPage, sortOrder));
  }
  render() {
    return <CompaniesPageComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  companiesCount: state.companies.companiesCount,
  companies: state.companies.companies,
  allCompaniesCount: state.companies.allCompaniesCount,
  currentPage: state.companies.currentPage,
  recordsPerPage: state.companies.recordsPerPage,
  totalPages: state.companies.totalPages,
  sortOrder: state.companies.sortOrder,
  violationsList: state.companies.violationsList,
  loyaltiesList: state.companies.loyaltiesList,
  categoriesList: state.companies.categoriesList,
  selectedFilters: state.companies.selectedFilters,
});

const mapDispatchToProps = (dispatch) => ({
  onRefresh: (currentPage, sortOrder, data) => dispatch(get(currentPage, sortOrder, data)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Container);
