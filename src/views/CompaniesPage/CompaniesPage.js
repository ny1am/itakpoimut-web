import React from 'react';
import PropTypes from 'prop-types';

import SearchResults from './SearchResults';
import SelectedFilters from './SelectedFilters';
import SearchInput from './SearchInput';
import Filters from './Filters';

import styles from './styles.scss';

class CompaniesPage extends React.Component {

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    const title = this.titleInput.value;
    const currentPage = 1;
    const { sortOrder, onRefresh } = this.props;
    onRefresh({ currentPage, sortOrder, title });
  }

  render() {
    const { companies, companiesCount, allCompaniesCount, currentPage, totalPages, sortOrder, title } = this.props;
    return (
      <div className="pattern-content">
        <div className="container">
          <div className={styles.searchBar}>
            <SearchInput
              value={title}
              innerRef={input => (this.titleInput = input)}
              onSubmit={this.refresh}
            />
            <SelectedFilters onChange={this.refresh} />
          </div>
          <div className={styles.searchBody}>
            <Filters refresh={this.refresh} />
            <SearchResults
              companies={companies}
              companiesCount={companiesCount}
              allCompaniesCount={allCompaniesCount}
              currentPage={currentPage}
              totalPages={totalPages}
              sortOrder={sortOrder}
              baseUrl={`/companies?title=${title || ''}`}
            />
          </div>
        </div>
      </div>
    );
  }
}

CompaniesPage.propTypes = {
  title: PropTypes.string,

  companies: PropTypes.array,
  companiesCount: PropTypes.number.isRequired,
  allCompaniesCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  sortOrder: PropTypes.string.isRequired,

  onRefresh: PropTypes.func.isRequired,
};

export default CompaniesPage;
