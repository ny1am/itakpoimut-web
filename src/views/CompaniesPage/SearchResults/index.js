import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Pagination from 'components/Pagination';
import CompanyOverview from 'components/CompanyOverview';

import styles from './styles.scss';

const SearchResults = ({ sortOrder, companies, companiesCount, allCompaniesCount, currentPage, totalPages }) => {
  const newSortOrder = (sortOrder === 'asc' ? 'desc' : 'asc');
  const sortClassName = `${styles.sort} ${styles[newSortOrder]}`;
  if (companies.length > 0) {
    return (
      <div className={styles.wrapper}>
        {/*id used for scrolling*/}
        <div id="results" className={styles.headerWrapper}>
          <div className={styles.header}>
            <span>
              Підібрано {companiesCount} з {allCompaniesCount} компаній
            </span>
            <Link to={`/companies?sortOrder=${newSortOrder}#results`} className={sortClassName}>
              За алфавітом
            </Link>
          </div>
        </div>
        <div className={styles.items}>
          {companies.map(company => (
            <CompanyOverview key={company._id} company={company} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          generateUrl={
            (page) => `/companies?sortOrder=${newSortOrder}&currentPage=${page}#results`
          }
        />
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        {/*id used for scrolling*/}
        <div id="results" className={styles.headerWrapper}>
          За заданими вами параметрами нічого не знайдено.
        </div>
      </div>
    );
  }
};

SearchResults.propTypes = {
  companies: PropTypes.array,
  companiesCount: PropTypes.number,
  allCompaniesCount: PropTypes.number,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  sortOrder: PropTypes.string,
};

export default SearchResults;
