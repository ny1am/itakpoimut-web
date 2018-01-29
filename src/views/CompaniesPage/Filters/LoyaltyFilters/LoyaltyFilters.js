import React from 'react';
import PropTypes from 'prop-types';

import CheckRow from 'components/CheckRow';
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
          <CheckRow
            type="radio"
            name="selectedLoyalty"
            value={loyalty.name}
            checked={loyalty.name===value}
            onChange={
              ({ target: { checked } }) => onChange(checked, loyalty.name)
            }
            text={loyalty.text}
            textClassName={"loyalty-color "+loyalty.name}
          />
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
