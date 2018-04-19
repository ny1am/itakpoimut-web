import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Pagination from 'components/Pagination';
import CompanyOverview from 'components/CompanyOverview';

import styles from './styles.scss';

const SearchResults = ({
  sortOrder,
  companies,
  companiesCount,
  allCompaniesCount,
  currentPage,
  totalPages,
  baseUrl,
}) => {
  const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  if (companies.length > 0) {
    return (
      <div className={styles.wrapper}>
        {/*id used for scrolling*/}
        <div id="results" className={styles.headerWrapper}>
          <div className={styles.header}>
            <span>
              Підібрано {companiesCount} з {allCompaniesCount} компаній
            </span>
            <Link
              to={`${baseUrl}&sortOrder=${newSortOrder}#results`}
              className={cn(styles.sort, styles[newSortOrder])}
            >
              За алфавітом
            </Link>
          </div>
        </div>
        <div className={styles.items}>
          {companies.map((company) => (
            <CompanyOverview key={company._id} company={company} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          generateUrl={(page) =>
            `${baseUrl}&sortOrder=${sortOrder}&currentPage=${page}#results`
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
  baseUrl: PropTypes.string.isRequired,
};

export default SearchResults;
