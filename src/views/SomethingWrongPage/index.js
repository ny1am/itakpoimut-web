import React from 'react';

import styles from './styles.scss';

/**
 * Server error page
 */
const SomethingWrongPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Ой!</div>
      <div className={styles.expl}>Сервер не працює</div>
    </div>
  );
};

export default SomethingWrongPage;
