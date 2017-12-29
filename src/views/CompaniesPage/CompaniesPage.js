import React from 'react';
import PropTypes from 'prop-types';

import SearchResults from './SearchResults';
import SelectedFilters from './SelectedFilters';
import SearchInput from './SearchInput';
import LoyaltyFilters from './Filters/LoyaltyFilters';
import CategoryFilters from './Filters/CategoryFilters';
import ViolationFilters from './Filters/ViolationFilters';

import loyalties from 'shared/js/loyalties';
import categories from 'shared/js/categories';
import violations from 'shared/js/violations';

import styles from './styles.scss';

class CompaniesPage extends React.Component {

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.handleLoyaltyChange = this.handleLoyaltyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleViolationChange = this.handleViolationChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.state = {
      selectedLoyalty: null,
      selectedCategory: props.selectedCategory || null,
      selectedViolations: [],
    };
  }

  refresh() {
    const title = this.titleInput.value;
    const { sortOrder } = this.props;
    this.props.onRefresh({
      currentPage: 1,
      sortOrder,
      title,
    });
  }

  handleLoyaltyChange({ checked, value }) {
    let selectedLoyalty = checked ? value : null;
    this.setState({ selectedLoyalty }, this.refresh);
  }

  handleCategoryChange({ checked, value }) {
    let selectedCategory = checked ? value : null;
    this.setState({ selectedCategory }, this.refresh);
  }

  handleViolationChange({ checked, value }) {
    let { selectedViolations } = this.state;
    selectedViolations = selectedViolations.filter(item => item !== value);
    if (checked) {
      selectedViolations.push(value);
    }
    this.setState({ selectedViolations }, this.refresh);
  }

  clearFilters() {
    this.setState({
      selectedLoyalty: null,
      selectedCategory: null,
      selectedViolations: [],
    }, () => {
      this.refresh({ currentPage: 1 });
    });
  }

  getSelectedFilters() {
    const { selectedLoyalty, selectedCategory, selectedViolations } = this.state;
    let result = [];
    selectedLoyalty && result.push({
      text: loyalties.getByName(selectedLoyalty).text,
      onRemove: () => this.handleLoyaltyChange({ checked: false, value: selectedLoyalty })
    });
    selectedCategory && result.push({
      text: categories.getByName(selectedCategory).text,
      onRemove: () => this.handleCategoryChange({ checked: false, value: selectedCategory })
    });
    result.push(...selectedViolations.map(violation => {
      return {
        text: violations.getByName(violation).text,
        onRemove: () => this.handleViolationChange({ checked: false, value: violation })
      };
    }));
    return result;
  }

  render() {
    const selectedFilters = this.getSelectedFilters();
    const {
      companies, companiesCount, allCompaniesCount, currentPage, totalPages, sortOrder, title,
      loyaltiesList, categoriesList, violationsList
    } = this.props;
    const { selectedLoyalty, selectedCategory, selectedViolations } = this.state;
    return (
      <div className="pattern-content">
        <div className="container">
          <div className={styles.searchBar}>
            <SearchInput
              value={title}
              innerRef={input => (this.titleInput = input)}
              onSubmit={this.refresh}
            />
            <SelectedFilters filters={selectedFilters} onRemoveAll={this.clearFilters} />
          </div>
          {/*todo: remove id needed for a container*/}
          <form id="companiesForm" action="/companies" method="POST">
            <div className={styles.searchBody}>
              <details className={styles.searchParams} open>
                <summary className={styles.searchParamsHeader}>
                  Фільтри
                </summary>
                <div className={styles.searchParamsBody}>
                  <LoyaltyFilters
                    value={selectedLoyalty}
                    list={loyaltiesList}
                    onChange={(evt) => this.handleLoyaltyChange(evt.target)}
                  />
                  <CategoryFilters
                    value={selectedCategory}
                    list={categoriesList}
                    onChange={(evt) => this.handleCategoryChange(evt.target)}
                  />
                  <ViolationFilters
                    value={selectedViolations}
                    list={violationsList}
                    onChange={(evt) => this.handleViolationChange(evt.target)}
                  />
                </div>
              </details>
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
          </form>
        </div>
      </div>
    );
  }
}

CompaniesPage.propTypes = {
  title: PropTypes.string,
  selectedCategory: PropTypes.string,

  loyaltiesList: PropTypes.array.isRequired,
  categoriesList: PropTypes.array.isRequired,
  violationsList: PropTypes.array.isRequired,

  companies: PropTypes.array,
  companiesCount: PropTypes.number.isRequired,
  allCompaniesCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  sortOrder: PropTypes.string.isRequired,

  onRefresh: PropTypes.func.isRequired,
};

export default CompaniesPage;
