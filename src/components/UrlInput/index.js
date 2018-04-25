import React from 'react';

import styles from './styles.scss';

class UrlInput extends React.PureComponent {
  render() {
    const { value, ...props } = this.props;
    let temp = 'http://';
    if (value.startsWith('https://')) {
      temp = 'https://';
    }
    return (
      <div className={styles.httpWrapper}>
        <div className={styles.hint}>{temp}</div>
        <input type="text" {...props} value={value} />
      </div>
    );
  }
}

export default UrlInput;
