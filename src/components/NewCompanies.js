import React from 'react';
import PropTypes from 'prop-types';

import CompanyPreview from 'components/CompanyPreview';

class NewCompanies extends React.Component {
  render() {
    if (this.props.companies.length === 0) return null;
    return (
      <section className="landing-container">
        <header className="landing-header">
          Нові компанії
        </header>
        <ul className="new-companies">
          {this.props.companies.map(item => (
            <li key={item._id}>
              <CompanyPreview company={item}/>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

NewCompanies.propTypes = {
  companies: PropTypes.array,
};

NewCompanies.defaultProps = {
  companies: []
};

export default NewCompanies;
