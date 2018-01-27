import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class Checkbox extends React.Component {
  render() {
    const { className, id, ...props } = this.props;
    const wrapperClassName = `${styles.checkbox} ${className||''}`;
    return (
      <div className={wrapperClassName}>
        <input type="checkbox"
          {...props}
          id={id}
        />
        <label htmlFor={id} />
      </div>
    );
  }
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
