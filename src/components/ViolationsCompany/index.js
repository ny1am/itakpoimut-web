import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class ViolationsCompany extends React.PureComponent {
  render() {
    const { violations } = this.props;
    if (violations.length > 0) {
      return (
        <ul className={styles.violations}>
          {violations.map((item, index) => (
            <li key={index}>
              <label>{item.text}</label>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  }
}

ViolationsCompany.propTypes = {
  violations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

export default ViolationsCompany;
