import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'components/Checkbox';

import styles from './styles.scss';

const ViolationFilters = ({ value, list, onChange }) => (
  <React.Fragment>
    <h3 className={styles.searchSubtitle}>
      Порушення
    </h3>
    <ul className={styles.searchGroup}>
      {list.map((violation, index) => (
        <li key={index} className="row">
          <div className="check-row">
            <Checkbox id={"vlt_"+violation.name}
              className="row-checkbox"
              name="selectedViolations[]"
              value={violation.name}
              checked={value.indexOf(violation.name) !== -1}
              onChange={onChange}
            />
            <label htmlFor={"vlt_"+violation.name}>
              {violation.text}
            </label>
          </div>
        </li>
      ))}
    </ul>
  </React.Fragment>
);

ViolationFilters.propTypes = {
  value: PropTypes.array,
  list: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ViolationFilters;
