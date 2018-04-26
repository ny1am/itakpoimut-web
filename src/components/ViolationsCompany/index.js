import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class ViolationsCompany extends React.PureComponent {
  render() {
    const { violation } = this.props;
    if (violation.length > 0) {
      return (
        <ul className={styles.violations}>
          {violation.map((item, index) => (
            <li key={index}>
              <label>{item.text}</label>
            </li>
          ))}
        </ul>
      );
    } else return null;
  }
}

ViolationsCompany.propTypes = {
  violation: PropTypes.array,
};

export default ViolationsCompany;
