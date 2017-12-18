import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import enhanceWithClickOutside from 'react-click-outside';

import categories from 'shared/js/categories';

import AutocompletePopup from './AutocompletePopup';
import styles from './styles.scss';

class AutocompleteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: this.props.shown,
      title: '',
      category: '',
      companies: []
    };
    this.changeTitle = this.changeTitle.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.search = this.search.bind(this);
    this.delayedSearch = debounce(this.search, 300);
  }
  componentWillReceiveProps(newProps) {
    this.setState({shown: newProps.shown});
  }
  changeTitle(e) {
    this.setState({
      title: e.target.value
    });
    this.delayedSearch();
  }
  changeCategory(e) {
    this.setState({
      category: e.target.value
    });
    this.delayedSearch();
  }
  onSubmit(e) {
    e.preventDefault();
    const { title, category: selectedCategory } = this.state;
    this.props.onSubmit({ title, selectedCategory });
  }
  search() {
    this.props.onSearch({term: this.state.title, category: this.state.category}).then(data => {
      this.setState({companies: data.payload.results, shown: true});
    });
  }
  handleClickOutside() {
    this.setState({shown: false});
  }
  render() {
    return (
      <article className={styles.wrapper}>
        <form action="/companies" method="GET" onSubmit={this.onSubmit}>
          <div className="search-construct">
            <div className="search-construct-input">
              <input name="title" type="text" placeholder="Введіть назву компанії" autoComplete="off" value={this.state.title} onChange={this.changeTitle} onFocus={this.search} />
              <AutocompletePopup companies={this.state.companies} shown={this.state.shown}/>
            </div>
            <div className={styles.select}>
              <select name="selectedCategory" value={this.state.category} onChange={this.changeCategory}>
                <option value="">Всі сфери</option>
                {this.props.categories.map(item => (
                  <option value={item.name} key={item.name}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="search-construct-button" />
          </div>
        </form>
      </article>
    );
  }
}

AutocompleteSearch.propTypes = {
  categories: PropTypes.array,
  shown: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

AutocompleteSearch.defaultProps = {
  categories: categories.list(),
  shown: true
};

export default enhanceWithClickOutside(AutocompleteSearch);
