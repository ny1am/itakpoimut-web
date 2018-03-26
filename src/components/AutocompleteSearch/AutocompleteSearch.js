import React from 'react';
import PropTypes from 'prop-types';

import AutocompletePopup from './AutocompletePopup';
import styles from './styles.scss';

class AutocompleteSearch extends React.PureComponent {
  render() {
    const { categories, companies, shown, title, category } = this.props;
    const { onSubmit, changeTitle, changeCategory, search } = this.props;
    return (
      <article className={styles.wrapper}>
        <form action="/companies" method="GET" onSubmit={onSubmit}>
          <div className={styles.searchWrapper}>
            <div className={styles.searchInput}>
              <input type="text"
                name="title"
                placeholder="Введіть назву компанії"
                autoComplete="off"
                value={title}
                onChange={changeTitle}
                onFocus={search}
              />
              {companies.length > 0 && shown && (
                <AutocompletePopup companies={companies} />
              )}
            </div>
            <div className={styles.select}>
              <select
                name="selectedCategory"
                value={category}
                onChange={changeCategory}
              >
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
  companies: PropTypes.array,
  shown: PropTypes.bool,
  title: PropTypes.string,
  category: PropTypes.string,
  search: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  changeCategory: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AutocompleteSearch;
