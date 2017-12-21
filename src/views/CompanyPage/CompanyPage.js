import React from 'react';
import PropTypes from 'prop-types';

import { ADD_VIOLATION_DIALOG, ADD_CATEGORY_DIALOG } from 'constants/dialog';
import DialogLink from 'components/DialogLink';
import CompanyComments from 'components/CompanyComments';
import { http, violationByName, categoryByName, loyaltySingleByName } from 'utils';

import styles from './styles.scss';

const CompanyPage = ({ loggedUser, commentsCount, comments, company, currentPage, totalPages }) => (
  <div className="pattern-content">
    <div className="container">
      <div className={styles.wrapper}>
        <section className="company">
          <div className={styles.profile}>
            <article className={styles.companyInfo}>
              <div className={styles.leftColumn}>
                <div className={styles.logo}>
                  <img src={company.img} title={company.title} />
                </div>
                <div className={"c-loyalty-mark "+company.loyalty}>
                  {loyaltySingleByName(company.loyalty)}
                </div>
              </div>
              <div className={styles.rightColumn}>
                <div className={styles.title} title={company.title}>
                  {company.title}
                </div>
                {company.company_site && (
                  <a href={http(company.company_site)} className={styles.url} target="_blank">
                    {http(company.company_site)}
                  </a>
                )}
                {company.description && (
                  <p className={styles.description}>
                    {company.description}
                  </p>
                )}
              </div>
            </article>
          </div>
          <div>
            <h2 className={styles.listTitle}>
              Порушення компанії
            </h2>
            {company.violations && (
              <ul className={styles.violations}>
                {company.violations.map((item, index) => (
                  <li key={index}>
                    <label>
                      {violationByName(item.name)}
                    </label>
                  </li>
                ))}
              </ul>
            )}
            <DialogLink dialogType={ADD_VIOLATION_DIALOG} dialogProps={{companyId: company._id}} className={styles.addViolation}>
              Додати порушення
            </DialogLink>
          </div>
          <div>
            <h2 className={styles.listTitle}>
              Сфери діяльності
            </h2>
            <ul className={styles.categories}>
              {company.categories.map((item, index) => (
                <li key={index} className={styles.item}>
                  {categoryByName(item)}
                </li>
              ))}
              <li>
                <DialogLink dialogType={ADD_CATEGORY_DIALOG} dialogProps={{companyId: company._id}} className={styles.addCategory}>
                  Додати сферу
                </DialogLink>
              </li>
            </ul>
          </div>
        </section>
        <div className={styles.commentsWrapper}>
          <CompanyComments
            loggedUser={loggedUser}
            commentsCount={commentsCount}
            comments={comments}
            company={company}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  </div>
);

CompanyPage.propTypes = {
  company: PropTypes.object,
  loggedUser: PropTypes.object,
  commentsCount: PropTypes.number,
  comments: PropTypes.array,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};

export default CompanyPage;
