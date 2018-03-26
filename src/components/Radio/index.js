import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

class Radio extends React.Component {
  render() {
    const { className, id, ...props } = this.props;
    return (
      <div className={cn(styles.radio, className)}>
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
