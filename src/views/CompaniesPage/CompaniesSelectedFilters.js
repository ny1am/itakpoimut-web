import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class CompaniesSelectedFilters extends React.Component {

  constructor(props) {
    super(props);
    this.removeFilters = this.removeFilters.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
  }

  removeFilters(e) {
    e.preventDefault();
    this.props.removeHandler();
  }

  removeFilter(e, id) {
    e.preventDefault();
    this.props.removeHandler(id);
  }

  render() {
    const { selectedFilters } = this.props;
    if (selectedFilters.length > 0) {
      return (
        <div className={styles.selectedFiltersHolder}>
          <ul className={styles.selectedFilters}>
            {selectedFilters.map((item, index) => (
              <li key={index} className={styles.item}>
                {item.text}
                {item.id && <div className={styles.removeFilter} onClick={(evt) => this.removeFilter(evt, item.id)} />}
              </li>
            ))}
            <li className={styles.all}>
              <a href="/companies" onClick={this.removeFilters}>
                Скинути всі
              </a>
            </li>
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

CompaniesSelectedFilters.propTypes = {
  selectedFilters: PropTypes.array,
  removeHandler: PropTypes.func,
};

CompaniesSelectedFilters.defaultProps = {
  selectedFilters: []
};

export default CompaniesSelectedFilters;
