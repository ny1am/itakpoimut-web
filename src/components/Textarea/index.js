import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

class Textarea extends React.PureComponent {
  render() {
    const { className, value, ...props } = this.props;
    let counter = value.length;
    return (
      <div className={cn(styles.wrapper, className)}>
        <textarea {...props} />
        <div className={styles.progress}>
          {counter}/{props.maxLength}
        </div>
      </div>
    );
  }
}

Textarea.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
};

export default Textarea;
