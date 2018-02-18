import React from 'react';

import styles from './styles.scss';

const Loading = () => (
  <section className={styles.container}>
    <div className={styles.viewportCenterer}>
      <div className={styles.wrapper}>
        <div className={styles.block} />
        <div className={`${styles.block} ${styles.delay}`} />
        <div className={`${styles.block} ${styles.delay}`} />
        <div className={styles.block} />
      </div>
    </div>
  </section>
);

export default Loading;
