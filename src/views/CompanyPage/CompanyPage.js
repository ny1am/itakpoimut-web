import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import DialogLink from 'components/DialogLink';
import Company from 'components/Company';

import CompanyComments from 'views/CompanyComments';
import ViolationsCompany from '../../components/ViolationsCompany';

import styles from './styles.scss';

const CompanyPage = ({ company }) => (
  <React.Fragment>
    <Helmet>
      <title>{company.title}</title>
    </Helmet>
    <div className="pattern-content">
      <div className="container">
        <div className={styles.wrapper}>
          <section>
            <Company company={company} />
            <div>
              <h2 className={styles.listTitle}>Порушення компанії</h2>
              <ViolationsCompany violations={company.violations} />
              <DialogLink
                to={`/add-violation/${company._id}`}
                className={styles.addViolation}
              >
                Додати порушення
              </DialogLink>
            </div>
            <div>
              <h2 className={styles.listTitle}>Сфери діяльності</h2>
              <ul className={styles.categories}>
                {company.categories.map((item, index) => (
                  <li key={index} className={styles.item}>
                    {item.text}
                  </li>
                ))}
                <li>
                  <DialogLink
                    to={`/add-category/${company._id}`}
                    className={styles.addCategory}
                  >
                    Додати сферу
                  </DialogLink>
                </li>
              </ul>
            </div>
          </section>
          <div className={styles.commentsWrapper}>
            <CompanyComments companyId={company._id} />
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

CompanyPage.propTypes = {
  company: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company_site: PropTypes.string,
    description: PropTypes.string,
    violations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CompanyPage;
