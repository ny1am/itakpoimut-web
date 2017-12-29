import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Pagination from 'components/Pagination';
import CompanyOverview from 'components/CompanyOverview';

import styles from './styles.scss';

class CompaniesSearchResults extends React.Component {

  render() {
    const newSortOrder = (this.props.sortOrder==='asc'?'desc':'asc');
    const sortClassName = `${styles.sort} ${newSortOrder==='asc'?styles.asc:styles.desc}`;
    if (this.props.companies.length > 0) {
      return (
        <div className={styles.searchResults}>
          {/*id used for scrolling*/}
          <div id="results" className={styles.searchResultsHeaderWrapper}>
            <div className={styles.searchResultsHeader}>
              <span>
                Підібрано {this.props.companiesCount} з {this.props.allCompaniesCount} компаній
              </span>
              <Link to={`/companies?sortOrder=${newSortOrder}#results`} className={sortClassName}>
                За алфавітом
              </Link>
            </div>
          </div>
          <div className={styles.searchResultsItems}>
            {this.props.companies.map(company => (
              <CompanyOverview key={company._id} company={company} />
            ))}
          </div>
          <Pagination
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            generateUrl={
              (page) => `/companies?sortOrder=${newSortOrder}&currentPage=${page}#results`
            }
          />
        </div>
      );
    } else {
      return (
        <div className={styles.searchResults}>
          <div id="results" className={styles.searchResultsHeaderWrapper}>
            За заданими вами параметрами нічого не знайдено.
          </div>
        </div>
      );
    }
  }
}

CompaniesSearchResults.propTypes = {
  companies: PropTypes.array,
  companiesCount: PropTypes.number,
  allCompaniesCount: PropTypes.number,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  sortOrder: PropTypes.string,
};

CompaniesSearchResults.defaultProps = {
  companies: [],
  companiesCount: 0,
  allCompaniesCount: 0,
  currentPage: 1,
  totalPages: 0,
  sortOrder: 'asc'
};

export default CompaniesSearchResults;
