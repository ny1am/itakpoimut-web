import React from 'react';

import DialogLink from 'components/DialogLink';

import styles from './styles.scss';

class NotLoggedIn extends React.PureComponent {
  render() {
    return (
      <div className={styles.notLoggedIn}>
        {`Для того, щоб залишити коментар, вам необхідно `}
        <DialogLink to="/login">ввійти</DialogLink>
      </div>
    );
  }

}

export default NotLoggedIn;
