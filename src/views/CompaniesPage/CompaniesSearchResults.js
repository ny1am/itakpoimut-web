import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'components/Pagination';
import CompanyOverview from 'components/CompanyOverview';

import styles from './styles.scss';

class CompaniesSearchResults extends React.Component {

  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  sort(evt, sortOrder) {
    evt.preventDefault();
    this.props.sort(sortOrder);
  }

  changePage(evt, currentPage) {
    evt.preventDefault();
    this.props.changePage(currentPage);
  }

  render() {
    const newSortOrder = (this.props.sortOrder==='asc'?'desc':'asc');
    const sortClassName = `${styles.sort} ${newSortOrder==='asc'?styles.asc:styles.desc}`;
    if (this.props.companies.length > 0) {
      return (
        <div className={styles.searchResults}>
          <div className={styles.searchResultsHeader}>
            <span>
              Підібрано {this.props.companiesCount} з {this.props.allCompaniesCount} компаній
            </span>
            <button type="submit" className={sortClassName} formAction={"/companies?sortOrder="+newSortOrder} onClick={(evt)=>{this.sort(evt, newSortOrder);}}>
              За алфавітом
            </button>
          </div>
          <div className={styles.searchResultsItems}>
            {this.props.companies.map(company => (
              <CompanyOverview key={company._id} company={company} />
            ))}
          </div>
          <Pagination currentPage={this.props.currentPage} totalPages={this.props.totalPages} changePage={this.changePage}>
            <button type="submit" formAction={"/companies?currentPage={{page}}&sortOrder="+this.props.sortOrder}/>
          </Pagination>
        </div>
      );
    } else {
      return (
        <div className={styles.searchResults}>
          За заданими вами параметрами нічого не знайдено.
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
  sort: PropTypes.func,
  changePage: PropTypes.func,
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
