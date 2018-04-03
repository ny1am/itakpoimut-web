import React from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.scss';

/**
 * Server error page
 */
const SomethingWrongPage = () => (
  <React.Fragment>
    <Helmet>
      <title>Ой!</title>
    </Helmet>
    <div className={styles.wrapper}>
      <div className={styles.title}>Ой!</div>
      <div className={styles.expl}>У нас проблеми :(</div>
    </div>
  </React.Fragment>
);

export default SomethingWrongPage;
