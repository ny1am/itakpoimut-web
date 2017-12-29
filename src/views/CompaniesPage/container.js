import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import serialize from 'form-serialize';

import { get } from 'actions/companies';

import CompaniesPageComponent from './CompaniesPage';

class Container extends React.Component {
  static fetch(match, location, { dispatch }) {
    const { title, selectedCategory, currentPage, sortOrder } = queryString.parse(location.search);
    const formElement = document.getElementById('companiesForm');
    let formData = {};
    if (formElement) {
      formData = serialize(formElement, { hash: true });
    }
    return dispatch(get({
      title,
      selectedCategory,
      currentPage,
      sortOrder,
      formData
    }));
  }
  render() {
    return <CompaniesPageComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { title, selectedCategory } = queryString.parse(state.router.location.search);
  return {
    title,
    selectedCategory,
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  onRefresh: ({ currentPage, sortOrder }) => dispatch(push(`/companies?sortOrder=${sortOrder}&currentPage=${currentPage}#results`)),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Container);
