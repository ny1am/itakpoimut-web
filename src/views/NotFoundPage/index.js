import React from 'react';

import styles from './styles.scss';

/**
 * 404 page
 */
const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>404</div>
      <div className={styles.expl}>Сторінки не існує</div>
    </div>
  );
};

export default NotFoundPage;
