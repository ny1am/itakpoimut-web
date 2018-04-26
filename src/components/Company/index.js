import React from 'react';
import PropTypes from 'prop-types';

import Loyalty from 'components/Loyalty';
import { http } from 'utils';

import styles from './styles.scss';

class Company extends React.PureComponent {
  render() {
    const { company } = this.props;
    return (
      <div className={styles.profile}>
        <article className={styles.companyInfo}>
          <div className={styles.leftColumn}>
            <div className={styles.logo}>
              <img src={company.img} title={company.title} />
            </div>
            <Loyalty company={company} className={styles.loyalty} />
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.title} title={company.title}>
              {company.title}
            </div>
            {company.company_site && (
              <a
                href={http(company.company_site)}
                className={styles.url}
                target="_blank"
                rel="noopener"
              >
                {http(company.company_site)}
              </a>
            )}
            {company.description && (
              <p className={styles.description}>{company.description}</p>
            )}
          </div>
        </article>
      </div>
    );
  }
}
Company.propTypes = {
  company: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company_site: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Company;
