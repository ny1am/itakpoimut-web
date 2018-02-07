import React from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.scss';

/**
 * Server error page
 */
const SomethingWrongPage = () => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>Ой!</title>
      </Helmet>
      <div className={styles.title}>Ой!</div>
      <div className={styles.expl}>У нас проблеми :(</div>
    </div>
  );
};

export default SomethingWrongPage;
