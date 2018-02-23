import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

/**
 * 403 page
 */
const NotAllowedPage = ({ timeToGo }) => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>403</title>
      </Helmet>
      <div className={styles.title}>403</div>
      <div className={styles.expl}>Немає доступу</div>
      <div className={styles.redirect}>
        Ви будете перенаправлені на <Link to="/">головну</Link> сторінку через {timeToGo} секунд
      </div>
    </div>
  );
};

NotAllowedPage.propTypes = {
  timeToGo: PropTypes.number.isRequired,
};

export default NotAllowedPage;
