import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';
import ShowHideWrapper from 'components/ShowHideWrapper';

import SearchResults from './SearchResults';
import SelectedFilters from './SelectedFilters';

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

      companies: props.companies,
      companiesCount: props.companiesCount,
      allCompaniesCount: props.allCompaniesCount,
      currentPage: props.currentPage,
      totalPages: props.totalPages,
    };
  }

  refresh(evt) {
    evt && evt.preventDefault();
    this.props.onRefresh({
      currentPage: this.state.currentPage,
      sortOrder: this.props.sortOrder,
    });
  }

  search(evt) {
    evt && evt.preventDefault();
    this.setState({currentPage: 1}, this.refresh);
  }

  handleLoyaltyChange({ target: { checked, value } }) {
    let selectedLoyalty = checked ? value : null;
    this.setState({ selectedLoyalty, currentPage: 1 }, this.refresh);
  }

  handleCategoryChange({ target: { checked, value } }) {
    let selectedCategory = checked ? value : null;
    this.setState({ selectedCategory, currentPage: 1 }, this.refresh);
  }

  handleViolationChange({ target: { checked, value } }) {
    let { selectedViolations } = this.state;
    selectedViolations = selectedViolations.filter(item => item !== value);
    if (checked) {
      selectedViolations.push(value);
    }
    this.setState({ selectedViolations, currentPage: 1 }, this.refresh);
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
        currentPage: 1
      }, this.refresh);
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

  renderLoyaltiesList() {
    const { loyaltiesList } = this.props;
    const { selectedLoyalty } = this.state;
    return loyaltiesList.map((loyalty, index) => (
      <li key={index} className="row">
        <div className="check-row">
          <Radio
            id={"rnk_"+loyalty.name}
            name="selectedLoyalty"
            value={loyalty.name}
            checked={loyalty.name===selectedLoyalty}
            onChange={this.handleLoyaltyChange}
            className="row-checkbox"
          />
          <label htmlFor={"rnk_"+loyalty.name} className={"loyalty-color "+loyalty.name}>
            {loyalty.text}
          </label>
        </div>
      </li>
    ));
  }

  prepareCategoriesList() {
    const { categoriesList } = this.props;
    const { selectedCategory } = this.state;
    return categoriesList.map((category) => ({
      priority: category.name===selectedCategory,
      key: category.name,
      node: (
        <div className="check-row" key={"ctg_"+category.name}>
          <Radio
            id={"ctg_"+category.name}
            name="selectedCategory"
            value={category.name}
            checked={category.name===selectedCategory}
            onChange={this.handleCategoryChange}
            className="row-checkbox"
          />
          <label htmlFor={"ctg_"+category.name}>
            {category.text}
          </label>
        </div>
      ),
    }));
  }

  renderViolationsList() {
    const { violationsList } = this.props;
    const { selectedViolations } = this.state;
    return violationsList.map((violation, index) => (
      <li key={index} className="row">
        <div className="check-row">
          <Checkbox id={"vlt_"+violation.name}
            className="row-checkbox"
            name="selectedViolations[]"
            value={violation.name}
            checked={selectedViolations.indexOf(violation.name) !== -1}
            onChange={this.handleViolationChange}
          />
          <label htmlFor={"vlt_"+violation.name}>
            {violation.text}
          </label>
        </div>
      </li>
    ));
  }

  render() {
    const selectedFilters = this.getSelectedFilters();
    const { companies, companiesCount, allCompaniesCount, currentPage, totalPages, sortOrder } = this.props;
    return (
      <div className="pattern-content">
        <div className="container">
          {/*todo: remove id needed for a container*/}
          <form id="companiesForm" action="/companies" method="POST" onSubmit={this.search}>
            <div className={styles.searchBar}>
              <div className={styles.searchWrapper}>
                <div className={styles.searchInput}>
                  <input type="text" name="title" placeholder="Введіть назву компанії" defaultValue={this.props.title} />
                </div>
                <button type="submit" className={styles.searchButton} />
              </div>
              <SelectedFilters filters={selectedFilters} onRemove={this.handleRemoveFilter} />
            </div>
            <div className={styles.searchBody}>
              <details className={styles.searchParams} open>
                <summary className={styles.searchParamsHeader}>
                  Фільтри
                </summary>
                <div className={styles.searchParamsBody}>
                  <h3 className={styles.searchSubtitle}>
                    За лояльністю
                  </h3>
                  <ul className={styles.searchGroup}>
                    {this.renderLoyaltiesList()}
                  </ul>

                  <h3 className={styles.searchSubtitle}>
                    Сфера
                  </h3>
                  <ShowHideWrapper
                    className={styles.searchGroup}
                    size={5}
                    items={this.prepareCategoriesList()}
                  />

                  <h3 className={styles.searchSubtitle}>
                    Порушення
                  </h3>
                  <ul className={styles.searchGroup}>
                    {this.renderViolationsList()}
                  </ul>
                </div>
              </details>
              <SearchResults
                companies={companies}
                companiesCount={companiesCount}
                allCompaniesCount={allCompaniesCount}
                currentPage={currentPage}
                totalPages={totalPages}
                sortOrder={sortOrder}
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

  loyaltiesList: PropTypes.array,
  categoriesList: PropTypes.array,
  violationsList: PropTypes.array,

  companies: PropTypes.array,
  companiesCount: PropTypes.number,
  allCompaniesCount: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  sortOrder: PropTypes.string.isRequired,

  onRefresh: PropTypes.func,
};

CompaniesPage.defaultProps = {
  companies: [],
  companiesCount: 0,
  allCompaniesCount: 0,
  totalPages: 0,
};

export default CompaniesPage;
