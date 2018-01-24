import React from 'react';
import PropTypes from 'prop-types';

import Radio from 'components/Radio';
import ShowHideWrapper from 'components/ShowHideWrapper';

import styles from './styles.scss';

const CategoryFilters = ({ value, list, onChange }) => {
  const items = list.map((category) => ({
    priority: value && category.name===value.name,
    key: category.name,
    node: (
      <div className="check-row" key={"ctg_"+category.name}>
        <Radio
          id={"ctg_"+category.name}
          name="selectedCategory"
          value={category.name}
          checked={category===value}
          onChange={({ target: { checked } }) => onChange(checked, category)}
          className="row-checkbox"
        />
        <label htmlFor={"ctg_"+category.name}>
          {category.text}
        </label>
      </div>
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
  value: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  list: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategoryFilters;
