import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import enhanceWithClickOutside from 'react-click-outside';

import AutocompletePopup from './AutocompletePopup';
import styles from './styles.scss';

class AutocompleteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      title: '',
      category: '',
      companies: []
    };
    this.changeTitle = this.changeTitle.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.search = this.search.bind(this);
    this.delayedSearch = debounce(this.search, 300);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  changeTitle(e) {
    const title = e.target.value;
    this.setState({ title }, this.delayedSearch);
  }
  changeCategory(e) {
    const category = e.target.value;
    this.setState({ category }, this.delayedSearch);
  }
  onSubmit(e) {
    e.preventDefault();
    const { title, category: selectedCategory } = this.state;
    this.props.onSubmit({ title, selectedCategory });
  }
  search() {
    const { title, category } = this.state;
    this.props.onSearch({ title, category }).then(data => {
      this.setState({
        companies: data.payload.results,
        shown: true,
      });
    });
  }
  handleClickOutside() {
    const shown = false;
    this.setState({ shown });
  }
  render() {
    const { companies, shown, title, category } = this.state;
    const { categories } = this.props;
    return (
      <article className={styles.wrapper}>
        <form action="/companies" method="GET" onSubmit={this.onSubmit}>
          <div className={styles.searchWrapper}>
            <div className={styles.searchInput}>
              <input type="text"
                name="title"
                placeholder="Введіть назву компанії"
                autoComplete="off"
                value={title}
                onChange={this.changeTitle}
                onFocus={this.search}
              />
              {companies.length > 0 && shown && (
                <AutocompletePopup companies={companies} />
              )}
            </div>
            <div className={styles.select}>
              <select name="selectedCategory" value={category} onChange={this.changeCategory}>
                <option value="">Всі сфери</option>
                {categories.map(item => (
                  <option value={item.name} key={item.name}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className={styles.searchButton} />
          </div>
        </form>
      </article>
    );
  }
}

AutocompleteSearch.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default enhanceWithClickOutside(AutocompleteSearch);
