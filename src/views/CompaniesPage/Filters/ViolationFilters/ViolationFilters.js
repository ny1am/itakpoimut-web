import React from 'react';
import PropTypes from 'prop-types';

import CheckRow from 'components/CheckRow';

import styles from '../styles.scss';

class ViolationFilters extends React.PureComponent {
  onChange = ({ target: { checked, value } }) => {
    return this.props.onChange(checked, value);
  };

  render() {
    const { value, list } = this.props;
    return (
      <React.Fragment>
        <h3 className={styles.searchSubtitle}>Порушення</h3>
        <ul className={styles.searchGroup}>
          {list.map((violation, index) => (
            <li key={index} className="row">
              <CheckRow
                text={violation.text}
                name="selectedViolations[]"
                value={violation.name}
                checked={value.includes(violation.name)}
                onChange={this.onChange}
              />
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

ViolationFilters.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string.isRequired),
  list: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ViolationFilters;
