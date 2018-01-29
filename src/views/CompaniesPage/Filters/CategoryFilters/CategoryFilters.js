import React from 'react';
import PropTypes from 'prop-types';

import CheckRow from 'components/CheckRow';
import ShowHideWrapper from 'components/ShowHideWrapper';

import styles from '../styles.scss';

const CategoryFilters = ({ value, list, onChange }) => {
  const items = list.map((category) => ({
    priority: category.name===value,
    key: category.name,
    node: (
      <CheckRow key={"ctg_"+category.name}
        type="radio"
        name="selectedCategory"
        value={category.name}
        checked={category.name===value}
        onChange={
          ({ target: { checked } }) => onChange(checked, category.name)
        }
        text={category.text}
      />
    ),
  }));
  return (
    <React.Fragment>
      <h3 className={styles.searchSubtitle}>
        Сфера
      </h3>
      <ShowHideWrapper
        className={styles.searchGroup}
        size={5}
        items={items}
      />
    </React.Fragment>
  );
};

CategoryFilters.propTypes = {
  value: PropTypes.string,
  list: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategoryFilters;
