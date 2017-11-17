import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { loyaltySingleByName } from 'utils';

//todo: refactor css names)
class CompanyOverview extends React.Component {
  render() {
    const company = this.props.company;
    return (
      <div className="result-row">
        <Link to={`/company/${company._id}`} className="result-row-logo">
          <img src={company.img} />
        </Link>
        <div className="result-row-body">
          <Link to={`/company/${company._id}`}>
            {company.title}
          </Link>
          <p className="result-row-desc">
            {company.description}
          </p>
        </div>
        <div className="result-row-loyalty">
          <div className={"loyalty-mark "+company.loyalty}>
            {loyaltySingleByName(company.loyalty)}
          </div>
        </div>
      </div>
    );
  }
}

CompanyOverview.propTypes = {
  company: PropTypes.object.isRequired
};

export default CompanyOverview;
