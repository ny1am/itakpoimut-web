import React from 'react';
import PropTypes from 'prop-types';

import { loyaltySingleByName } from 'utils';

class AutocompleteCompany extends React.Component {
  render() {
    const company = this.props.company;
    return (
      <a href={"/company/"+company._id} className="ac-results-row">
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
      </a>
    );
  }
}

AutocompleteCompany.propTypes = {
  company: PropTypes.object.isRequired
};

export default AutocompleteCompany;
