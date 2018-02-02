import React from 'react';

import { LOGIN_DIALOG, SIGNUP_DIALOG } from 'consts/dialog';
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
          <DialogLink dialogType={LOGIN_DIALOG} className="dialog__button">
            Ввійти
          </DialogLink>
          <br/>
          <DialogLink dialogType={SIGNUP_DIALOG} className="regularLink">
            Реєстрація
          </DialogLink>
        </div>
      </div>
    );
  }
}

export default PleaseSignupDialog;
