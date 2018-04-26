import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class Textarea extends React.PureComponent {
  render() {
    const { className, value, ...props } = this.props;
    let counter = value.length;
    return (
      <div className={styles.wrapper}>
        <textarea className={className} {...props} />
        <div>
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
