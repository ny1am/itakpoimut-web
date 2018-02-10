import React from 'react';

import DialogLink from 'components/DialogLink';

import styles from './styles.scss';

class PleaseSignupDialog extends React.Component {
  render() {
    return (
      <div className={`dialog_content ${styles.wrapper}`}>
        <div className={styles.icon} />
        <div className={styles.text}>
          Ця дія доступна тільки зареєстрованим користувачам
        </div>
        <div className={styles.actions}>
          <DialogLink to="/dialog/login" className="dialog__button">
            Ввійти
          </DialogLink>
          <br/>
          <DialogLink to="/dialog/signup" className="regularLink">
            Реєстрація
          </DialogLink>
        </div>
      </div>
    );
  }
}

export default PleaseSignupDialog;
