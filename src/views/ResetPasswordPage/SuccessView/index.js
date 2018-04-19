import React from 'react';

import SuccessViewComponent from 'components/SuccessView';
import DialogLink from 'components/DialogLink';

import styles from './styles.scss';

const SuccessView = () => (
  <SuccessViewComponent title="Вітаємо!">
    <p className={styles.successMsg}>
      {`Тепер ви можете `}
      <DialogLink className={styles.link} to="/login">
        ввійти
      </DialogLink>
      {` з вашим новим паролем!`}
    </p>
  </SuccessViewComponent>
);

export default SuccessView;
