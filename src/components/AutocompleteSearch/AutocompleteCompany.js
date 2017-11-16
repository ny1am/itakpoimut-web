import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { loyaltySingleByName } from 'utils';

class AutocompleteCompany extends React.Component {
  render() {
    const company = this.props.company;
    return (
      <Link to={`/company/${company._id}`} className="ac-results-row">
        <div className="ac-row-logo">
          <img src={company.img} />
        </div>
        <div className="ac-row-title">
          {company.title}
        </div>
        <div className="ac-row-loyalty">
          <div className={"loyalty-mark "+company.loyalty}>
            {loyaltySingleByName(company.loyalty)}
          </div>
        </div>
      </Link>
    );
  }
}

AutocompleteCompany.propTypes = {
  company: PropTypes.object.isRequired
};

export default AutocompleteCompany;
