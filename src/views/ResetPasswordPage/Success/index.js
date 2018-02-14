import React from 'react';

import SuccessDialogComponent from 'components/SuccessDialog';
import DialogLink from 'components/DialogLink';

import styles from './styles.scss';

const Success = () => (
  <SuccessDialogComponent title="Вітаємо!">
    <p className={styles.successMsg}>
      {`Тепер ви можете `}
      <DialogLink className={styles.link} to="/dialog/login">ввійти</DialogLink>
      {` з вашим новим паролем!`}
    </p>
  </SuccessDialogComponent>
);

export default Success;
