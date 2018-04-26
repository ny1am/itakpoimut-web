import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

class Textarea extends React.PureComponent {
  render() {
    const { className, value, maxLength, ...props } = this.props;
    let counter = value.length;
    return (
      <div className={cn(styles.wrapper, className)}>
        <textarea maxLength={maxLength} {...props} />
        <div className={styles.progress}>
          {counter}/{maxLength}
        </div>
      </div>
    );
  }
}

Textarea.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number.isRequired,
};

export default Textarea;
