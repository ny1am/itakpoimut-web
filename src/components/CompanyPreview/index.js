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
      <Link to={`/company/${company._id}`}>{company.title}</Link>
    </label>
  </article>
);

CompanyPreview.propTypes = {
  company: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default CompanyPreview;
