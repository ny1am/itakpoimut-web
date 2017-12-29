import React from 'react';
import PropTypes from 'prop-types';
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
    const { currentPage, sortOrder, title, selectedCategory } = queryString.parse(this.props.location.search);
    return (<CompaniesPageComponent
      {...this.props.initialData}
      {...this.props}
      title={title}
      currentPage={Number(currentPage || 1)}
      sortOrder={sortOrder || 'asc'}
      selectedCategory={selectedCategory}
    />);
  }
}

Container.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
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

const mapDispatchToProps = (dispatch) => ({
  onRefresh: ({ currentPage, sortOrder, title }) => dispatch(push(`/companies?title=${title}&sortOrder=${sortOrder}&currentPage=${currentPage}#results`)),
  dispatch
});

export default connect(
  null, mapDispatchToProps
)(Container);
