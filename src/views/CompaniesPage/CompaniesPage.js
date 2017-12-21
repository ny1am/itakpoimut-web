import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';

import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';
import ShowHideWrapper from 'components/ShowHideWrapper';

import CompaniesSearchResults from './CompaniesSearchResults';
import CompaniesSelectedFilters from './CompaniesSelectedFilters';

import loyalties from 'shared/js/loyalties';
import categories from 'shared/js/categories';
import violations from 'shared/js/violations';

import styles from './styles.scss';

class CompaniesPage extends React.Component {

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.search = this.search.bind(this);
    this.sort = this.sort.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleLoyaltyChange = this.handleLoyaltyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleViolationChange = this.handleViolationChange.bind(this);
    this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
    this.state = {
      selectedLoyalty: props.selectedLoyalty||null,
      selectedCategory: props.selectedCategory||null,
      selectedViolations: props.selectedViolations,

      companies: props.companies,
      companiesCount: props.companiesCount,
      allCompaniesCount: props.allCompaniesCount,
      currentPage: props.currentPage,
      totalPages: props.totalPages,
      sortOrder: props.sortOrder,

      selectedFilters: props.selectedFilters
    };
  }

  refresh(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.props.onRefresh({
      currentPage: this.state.currentPage,
      sortOrder: this.state.sortOrder,
      formData: serialize(this.form, { hash: true })
    });
  }

  search(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.setState({currentPage: 1}, this.refresh);
  }

  sort(sortOrder) {
    this.setState({sortOrder, currentPage: 1}, this.refresh);
  }

  changePage(currentPage) {
    this.setState({currentPage}, this.refresh);
  }

  handleRemoveFilter(id) {
    if (id) {
      let filter = this.state.selectedFilters.find(el => el.id === id);
      if (filter) {
        if (filter.type === 'loyalty') {
          this.setState({selectedLoyalty: null, currentPage: 1}, this._calculateSelectedFilters);
        }
        if (filter.type === 'category') {
          this.setState({selectedCategory: null, currentPage: 1}, this._calculateSelectedFilters);
        }
        if (filter.type === 'violation') {
          let selectedViolations = this.state.selectedViolations;
          let index = selectedViolations.indexOf(id);
          if (index > -1) {
            selectedViolations.splice(index, 1);
          }
          this.setState({selectedViolations, currentPage: 1}, this._calculateSelectedFilters);
        }
      }
    } else {
      this.setState({
        selectedLoyalty: null,
        selectedCategory: null,
        selectedViolations: [],
        selectedFilters: [],
        currentPage: 1
      }, this._calculateSelectedFilters);
    }
  }

  handleLoyaltyChange(el) {
    let selectedLoyalty = el.target.checked?el.target.value:null;
    this.setState({selectedLoyalty, currentPage: 1}, this._calculateSelectedFilters);
  }

  handleCategoryChange(el) {
    let selectedCategory = el.target.checked?el.target.value:null;
    this.setState({selectedCategory, currentPage: 1}, this._calculateSelectedFilters);
  }

  handleViolationChange(el) {
    let selectedViolations = this.state.selectedViolations;
    if (el.target.checked) {
      selectedViolations.push(el.target.value);
    } else {
      let index = selectedViolations.indexOf(el.target.value);
      if (index > -1) {
        selectedViolations.splice(index, 1);
      }
    }
    this.setState({selectedViolations, currentPage: 1}, this._calculateSelectedFilters);
  }

  _calculateSelectedFilters() {
    let result = [];
    if (this.state.selectedLoyalty) {
      result.push({
        id: this.state.selectedLoyalty,
        type: 'loyalty',
        text: loyalties.getByName(this.state.selectedLoyalty).text
      });
    }
    if (this.state.selectedCategory) {
      result.push({
        id: this.state.selectedCategory,
        type: 'category',
        text: categories.getByName(this.state.selectedCategory).text
      });
    }
    result.push(...this.state.selectedViolations.map(violation => {
      return {
        id: violation,
        type: 'violation',
        text: violations.getByName(violation).text
      };
    }));
    this.setState({selectedFilters: result}, this.refresh);
  }

  renderLoyaltiesList() {
    return this.props.loyaltiesList.map((loyalty, index) => (
      <li key={index} className="row">
        <div className="check-row">
          <Radio id={"rnk_"+loyalty.name} name="selectedLoyalty" value={loyalty.name} defaultChecked={loyalty.name===this.state.selectedLoyalty} onChange={this.handleLoyaltyChange} className="row-checkbox" />
          <label htmlFor={"rnk_"+loyalty.name} className={"loyalty-color "+loyalty.name}>
            {loyalty.text}
          </label>
        </div>
      </li>
    ));
  }
  renderCategoriesList() {
    return this.props.categoriesList.map((category) => (
      <div className="check-row" key={"ctg_"+category.name} checked={category.name===this.state.selectedCategory}>
        <Radio id={"ctg_"+category.name} name="selectedCategory" value={category.name} defaultChecked={category.name===this.state.selectedCategory} onChange={this.handleCategoryChange} className="row-checkbox" />
        <label htmlFor={"ctg_"+category.name}>
          {category.text}
        </label>
      </div>
    ));
  }
  renderViolationsList() {
    return this.props.violationsList.map((violation, index) => (
      <li key={index} className="row">
        <div className="check-row">
          <Checkbox id={"vlt_"+violation.name} name="selectedViolations[]" value={violation.name} checked={this.state.selectedViolations.indexOf(violation.name)>-1} onChange={this.handleViolationChange} className="row-checkbox"/>
          <label htmlFor={"vlt_"+violation.name}>
            {violation.text}
          </label>
        </div>
      </li>
    ));
  }

  render() {
    return (
      <div className="pattern-content">
        <div className="container">
          <form action="/companies" method="POST" ref={(ref) => this.form = ref} onSubmit={this.search}>
            <div className="search-bar">
              <div className={styles.searchWrapper}>
                <div className={styles.searchInput}>
                  <input type="text" name="title" placeholder="Введіть назву компанії" defaultValue={this.props.title} />
                </div>
                <button type="submit" className={styles.searchButton} />
              </div>
              <CompaniesSelectedFilters selectedFilters={this.state.selectedFilters} removeHandler={this.handleRemoveFilter} />
            </div>
            <div className="search-body">
              <details className="search-params" open>
                <summary className="search-params-header">
                  Фільтри
                </summary>
                <div className="search-params-body">
                  <h3 className="search-subtitle">
                    За лояльністю
                  </h3>
                  <ul className="search-chk-group">
                    {this.renderLoyaltiesList()}
                  </ul>

                  <h3 className="search-subtitle">
                    Сфера
                  </h3>
                  <ShowHideWrapper size={5}>
                    {this.renderCategoriesList()}
                  </ShowHideWrapper>

                  <h3 className="search-subtitle">
                    Порушення
                  </h3>
                  <ul className="search-chk-group">
                    {this.renderViolationsList()}
                  </ul>
                </div>
              </details>
              <CompaniesSearchResults
                companies={this.props.companies}
                companiesCount={this.props.companiesCount}
                allCompaniesCount={this.props.allCompaniesCount}
                currentPage={this.props.currentPage}
                totalPages={this.props.totalPages}
                sortOrder={this.props.sortOrder}
                sort={this.sort}
                changePage={this.changePage}
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
  selectedLoyalty: PropTypes.string,
  selectedCategory: PropTypes.string,

  loyaltiesList: PropTypes.array,
  categoriesList: PropTypes.array,
  violationsList: PropTypes.array,
  companies: PropTypes.array,
  companiesCount: PropTypes.number,
  allCompaniesCount: PropTypes.number,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  sortOrder: PropTypes.string,
  selectedViolations: PropTypes.array,
  selectedFilters: PropTypes.array,

  onRefresh: PropTypes.func,
};

CompaniesPage.defaultProps = {
  loyaltiesList: [],
  categoriesList: [],
  violationsList: [],
  companies: [],
  companiesCount: 0,
  allCompaniesCount: 0,
  currentPage: 1,
  totalPages: 0,
  sortOrder: 'asc',
  selectedViolations: [],
  selectedFilters: []
};

export default CompaniesPage;
