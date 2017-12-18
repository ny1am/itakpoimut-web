import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

const CompanyPreview = ({ company }) => (
  <article className={styles.wrapper}>
    <Link to={`/company/${company._id}`} className={styles.logo}>
      <img src={company.img} />
    </Link>
    <label className={styles.title}>
      <Link to={`/company/${company._id}`}>
        {company.title}
      </Link>
    </label>
  </article>
);

CompanyPreview.propTypes = {
  company: PropTypes.object.isRequired,
};

export default CompanyPreview;
