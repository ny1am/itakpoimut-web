import React from 'react';
import PropTypes from 'prop-types';

import LandingSection from 'components/LandingSection';
import CompanyPreview from 'components/CompanyPreview';

import styles from './styles.scss';

class NewCompanies extends React.PureComponent {
  render() {
    const { companies } = this.props;
    if (!companies) {
      return null;
    }
    return (
      <LandingSection title="Нові компанії">
        <ul className={styles.newCompanies}>
          {companies.map(item => (
            <li key={item._id}>
              <CompanyPreview company={item}/>
            </li>
          ))}
        </ul>
      </LandingSection>
    );
  }
}

NewCompanies.propTypes = {
  companies: PropTypes.array,
};

export default NewCompanies;
