import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CompanyPreview extends React.Component {
  render() {
    const company = this.props.company;
    return (
      <article className="company-preview">
        <Link to={`/company/${company._id}`} className="p-company-logo">
          <img src={company.img} />
        </Link>
        <label className="p-company-title">
          <Link to={`/company/${company._id}`}>
            {company.title}
          </Link>
        </label>
      </article>
    );
  }
}

CompanyPreview.propTypes = {
  company: PropTypes.object.isRequired
};

export default CompanyPreview;
