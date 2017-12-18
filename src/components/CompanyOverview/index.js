import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { loyaltySingleByName } from 'utils';

import styles from './styles.scss';

//todo: refactor css names)
const CompanyOverview = ({ company }) => (
  <div className={styles.wrapper}>
    <Link to={`/company/${company._id}`} className={styles.logo}>
      <img src={company.img} />
    </Link>
    <div className={styles.body}>
      <Link to={`/company/${company._id}`}>
        {company.title}
      </Link>
      <p className={styles.description}>
        {company.description}
      </p>
    </div>
    <div className={styles.loyalty}>
      <div className={"loyalty-mark "+company.loyalty}>
        {loyaltySingleByName(company.loyalty)}
      </div>
    </div>
  </div>
);

CompanyOverview.propTypes = {
  company: PropTypes.object.isRequired
};

export default CompanyOverview;
