import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

/**
 * 404 page
 */
const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>
        404 Page Not Found
      </h1>
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
};

export default NotFoundPage;
