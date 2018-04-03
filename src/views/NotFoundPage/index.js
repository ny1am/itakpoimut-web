import React from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.scss';

/**
 * 404 page
 */
const NotFoundPage = () => (
  <React.Fragment>
    <Helmet>
      <title>404</title>
    </Helmet>
    <div className={styles.wrapper}>
      <div className={styles.title}>404</div>
      <div className={styles.expl}>Сторінки не існує</div>
    </div>
  </React.Fragment>
);

export default NotFoundPage;
