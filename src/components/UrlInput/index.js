import React from 'react';

import styles from './styles.scss';

class UrlInput extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    return (
      <div className={styles.httpWrapper}>
        <input type="text" {...props} />
      </div>
    );
  }
}
export default UrlInput;
