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
    this.search = this.search.bind(this);
    this.handleLoyaltyChange = this.handleLoyaltyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleViolationChange = this.handleViolationChange.bind(this);
    this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
    this.state = {
      selectedLoyalty: null,
      selectedCategory: props.selectedCategory || null,
      selectedViolations: [],
    };
  }

  refresh({ currentPage }) {
    const title = this.titleInput.value;
    this.props.onRefresh({
      currentPage: currentPage || this.props.currentPage,
      sortOrder: this.props.sortOrder,
      title,
    });
  }

  search(evt) {
    evt && evt.preventDefault();
    this.refresh({ currentPage: 1 });
  }

  handleLoyaltyChange({ target: { checked, value } }) {
    let selectedLoyalty = checked ? value : null;
    this.setState({ selectedLoyalty }, () => {
      this.refresh({ currentPage: 1 });
    });
  }

  handleCategoryChange({ target: { checked, value } }) {
    let selectedCategory = checked ? value : null;
    this.setState({ selectedCategory }, () => {
      this.refresh({ currentPage: 1 });
    });
  }

  handleViolationChange({ target: { checked, value } }) {
    let { selectedViolations } = this.state;
    selectedViolations = selectedViolations.filter(item => item !== value);
    if (checked) {
      selectedViolations.push(value);
    }
    this.setState({ selectedViolations }, () => {
      this.refresh({ currentPage: 1 });
    });
  }

  handleRemoveFilter(filter) {
    if (filter) {
      const fakeElement = {
        target: {
          checked: false,
          value: filter.id
        }
      };
      if (filter.type === 'loyalty') {
        this.handleLoyaltyChange(fakeElement);
      }
      if (filter.type === 'category') {
        this.handleCategoryChange(fakeElement);
      }
      if (filter.type === 'violation') {
        this.handleViolationChange(fakeElement);
      }
    } else {
      this.setState({
        selectedLoyalty: null,
        selectedCategory: null,
        selectedViolations: [],
      }, () => {
        this.refresh({ currentPage: 1 });
      });
    }
  }

  getSelectedFilters() {
    const { selectedLoyalty, selectedCategory, selectedViolations } = this.state;
    let result = [];
    selectedLoyalty && result.push({
      id: selectedLoyalty,
      type: 'loyalty',
      text: loyalties.getByName(selectedLoyalty).text
    });
    selectedCategory && result.push({
      id: selectedCategory,
      type: 'category',
      text: categories.getByName(selectedCategory).text
    });
    result.push(...selectedViolations.map(violation => {
      return {
        id: violation,
        type: 'violation',
        text: violations.getByName(violation).text
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
              onSubmit={this.search}
            />
            <SelectedFilters filters={selectedFilters} onRemove={this.handleRemoveFilter} />
          </div>
          {/*todo: remove id needed for a container*/}
          <form id="companiesForm" action="/companies" method="POST" onSubmit={this.search}>
            <div className={styles.searchBody}>
              <details className={styles.searchParams} open>
                <summary className={styles.searchParamsHeader}>
                  Фільтри
                </summary>
                <div className={styles.searchParamsBody}>
                  <LoyaltyFilters
                    value={selectedLoyalty}
                    list={loyaltiesList}
                    onChange={this.handleLoyaltyChange}
                  />
                  <CategoryFilters
                    value={selectedCategory}
                    list={categoriesList}
                    onChange={this.handleCategoryChange}
                  />
                  <ViolationFilters
                    value={selectedViolations}
                    list={violationsList}
                    onChange={this.handleViolationChange}
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
