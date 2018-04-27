import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import DialogLink from 'components/DialogLink';
import Company from 'components/Company';
import CategoriesCompany from 'components/CategoriesCompany';

import CompanyComments from 'views/CompanyComments';
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
              {company.violations && (
                <ul className={styles.violations}>
                  {company.violations.map((item, index) => (
                    <li key={index}>
                      <label>{item.text}</label>
                    </li>
                  ))}
                </ul>
              )}
              <DialogLink
                to={`/add-violation/${company._id}`}
                className={styles.addViolation}
              >
                Додати порушення
              </DialogLink>
            </div>
            <div>
              <h2 className={styles.listTitle}>Сфери діяльності</h2>
              <CategoriesCompany company={company} />
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
