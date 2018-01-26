import React from 'react';
import PropTypes from 'prop-types';

import Radio from 'components/Radio';
import loyalty from 'utils/enums/loyalty';

import styles from '../styles.scss';

const LoyaltyFilters = ({ value, list, onChange }) => (
  <React.Fragment>
    <h3 className={styles.searchSubtitle}>
      За лояльністю
    </h3>
    <ul className={styles.searchGroup}>
      {list.map((loyalty, index) => (
        <li key={index} className="row">
          <div className="check-row">
            <Radio
              id={"rnk_"+loyalty.name}
              name="selectedLoyalty"
              value={loyalty.name}
              checked={loyalty.name===value}
              onChange={
                ({ target: { checked } }) => onChange(checked, loyalty.name)
              }
              className="row-checkbox"
            />
            <label htmlFor={"rnk_"+loyalty.name} className={"loyalty-color "+loyalty.name}>
              {loyalty.text}
            </label>
          </div>
        </li>
      ))}
    </ul>
  </React.Fragment>
);

LoyaltyFilters.defaultProps = {
  list: loyalty,
};

LoyaltyFilters.propTypes = {
  value: PropTypes.string,
  list: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LoyaltyFilters;
