import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';

import { get, changeCategory } from 'actions/companies';
import { get as getCategories } from 'actions/category';
import { get as getViolations } from 'actions/violation';

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
    return [{
      promise: dispatch(getCategories()),
    }, {
      promise: dispatch(getViolations()),
    }, {
      prop: 'companiesData',
      promise: companiesPromise
    }];
  }

  render() {
    const { currentPage, sortOrder, title } = queryString.parse(this.props.location.search);
    const { initialData, ...props } = this.props;
    return (<CompaniesPageComponent
      {...initialData.companiesData}
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
  initialData: PropTypes.shape({
    companiesData: PropTypes.shape({
      companiesCount: PropTypes.number,
      companies: PropTypes.array,
      allCompaniesCount: PropTypes.number,
      recordsPerPage: PropTypes.number,
      totalPages: PropTypes.number,
    })
  })
};

const mapDispatchToProps = (dispatch) => ({
  onRefresh: ({ currentPage, sortOrder, title }) => dispatch(push(
    `/companies?title=${title}&sortOrder=${sortOrder}&currentPage=${currentPage}#results`
  )),
  dispatch
});

export default connect(null, mapDispatchToProps)(Container);
