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
    const selectedLoyalty = checked ? value : null;
    this.props.onLoyaltyChange(selectedLoyalty).then(this.refresh);
  }

  handleCategoryChange({ checked, value }) {
    const selectedCategory = checked ? value : null;
    this.props.onCategoryChange(selectedCategory).then(this.refresh);
  }

  handleViolationChange({ checked, value }) {
    let { selectedViolations } = this.props;
    selectedViolations = selectedViolations.filter(item => item !== value);
    if (checked) {
      selectedViolations.push(value);
    }
    this.props.onViolationChange(selectedViolations).then(this.refresh);
  }

  clearFilters() {
    this.props.onClearFilters().then(this.refresh);
  }

  getSelectedFilters() {
    const { selectedLoyalty, selectedCategory, selectedViolations } = this.props;
    const result = [];
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

  renderFilters() {
    const { loyaltiesList, categoriesList, violationsList } = this.props;
    const { selectedLoyalty, selectedCategory, selectedViolations } = this.props;
    return (
      <form action="/companies" method="POST">
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
      </form>
    );
  }

  render() {
    const selectedFilters = this.getSelectedFilters();
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
            <SelectedFilters filters={selectedFilters} onRemoveAll={this.clearFilters} />
          </div>
          <div className={styles.searchBody}>
            <div className={styles.searchParams}>
              {this.renderFilters()}
            </div>
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
  selectedLoyalty: PropTypes.string,
  selectedCategory: PropTypes.string,
  selectedViolations: PropTypes.arrayOf(PropTypes.string),

  loyaltiesList: PropTypes.array.isRequired,
  categoriesList: PropTypes.array.isRequired,
  violationsList: PropTypes.array.isRequired,

  companies: PropTypes.array,
  companiesCount: PropTypes.number.isRequired,
  allCompaniesCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  sortOrder: PropTypes.string.isRequired,

  onClearFilters: PropTypes.func.isRequired,
  onLoyaltyChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onViolationChange: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default CompaniesPage;
