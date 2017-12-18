import React from 'react';

import { LOGIN_DIALOG, SIGNUP_DIALOG } from 'constants/dialog';
import DialogLink from 'components/DialogLink';

import styles from './styles.scss';

class PleaseSignupDialog extends React.Component {
  render() {
    return (
      <div className={`dialog_content ${styles.wrapper}`}>
        <div className={styles.icon} />
        <h1 className={styles.text}>
          Ця дія доступна тільки зареєстрованим користувачам
        </h1>
        <div className="actions">
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
