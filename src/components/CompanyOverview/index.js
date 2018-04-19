import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Loyalty from 'components/Loyalty';

import styles from './styles.scss';

const CompanyOverview = ({ company }) => (
  <div className={styles.wrapper}>
    <Link to={`/company/${company._id}`} className={styles.logo}>
      <img src={company.img} />
    </Link>
    <div className={styles.body}>
      <Link to={`/company/${company._id}`}>{company.title}</Link>
      <p className={styles.description}>{company.description}</p>
    </div>
    <div className={styles.loyalty}>
      <Loyalty company={company} adaptive />
    </div>
  </div>
);

CompanyOverview.propTypes = {
  company: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default CompanyOverview;
