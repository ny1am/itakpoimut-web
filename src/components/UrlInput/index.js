import React from 'react';

import styles from './styles.scss';

class UrlInput extends React.PureComponent {
  render() {
    const { value, ...props } = this.props;
    let hint = 'http://';
    if (value.startsWith('https://')) {
      hint = 'https://';
    }
    return (
      <div className={styles.httpWrapper}>
        <div className={styles.hint}>{hint}</div>
        <input type="text" {...props} value={value} />
      </div>
    );
  }
}

export default UrlInput;
