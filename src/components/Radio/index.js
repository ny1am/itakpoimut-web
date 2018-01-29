import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class Radio extends React.Component {
  render() {
    const { className, id, ...props } = this.props;
    const wrapperClassName = `${styles.radio} ${className||''}`;
    return (
      <div className={wrapperClassName}>
        <input type="radio"
          {...props}
          id={id}
        />
        <label htmlFor={id} />
      </div>
    );
  }
}

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Radio;
