import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

class Checkbox extends React.PureComponent {
  render() {
    const { className, id, ...props } = this.props;
    return (
      <div className={cn(styles.checkbox, className)}>
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
