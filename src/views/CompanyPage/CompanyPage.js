import React from 'react';
import PropTypes from 'prop-types';

import CompanyComments from 'components/CompanyComments';
import { http, violationByName, categoryByName, loyaltySingleByName } from 'utils';

class CompanyPage extends React.Component {
  renderSite() {
    let company = this.props.company;
    if (company.company_site) {
      return (
        <a href={http(company.company_site)} className="company-url" target="_blank">
          {http(company.company_site)}
        </a>
      );
    } else {
      return null;
    }
  }
  renderDescription() {
    let company = this.props.company;
    if (company.description) {
      return (
        <p className="company-desc">
          {company.description}
        </p>
      );
    } else {
      return null;
    }
  }
  renderViolations() {
    let company = this.props.company;
    if (company.violations) {
      return (
        <ul className="company-violations">
          {this._renderViolationsList()}
        </ul>
      );
    } else {
      return null;
    }
  }
  _renderViolationsList() {
    let company = this.props.company;
    return company.violations.map((item, index) => (
      <li key={index}>
        <label>
          {violationByName(item.name)}
        </label>
      </li>
    ));
  }
  renderCategories() {
    let company = this.props.company;
    return company.categories.map((item, index) => (
      <li key={index} className="item">
        {categoryByName(item)}
      </li>
    ));
  }
  render() {
    let company = this.props.company;
    return (
      <div className="pattern-content">
        <div className="container">
          <div className="company-wrapper">
            <section className="company">
              <div className="company-profile">
                <article className="company-info">
                  <div className="col-1">
                    <div className="company-logo">
                      <img src={company.img} title={company.title} />
                    </div>
                    <div className={"c-loyalty-mark "+company.loyalty}>
                      {loyaltySingleByName(company.loyalty)}
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="company-title" title={company.title}>
                      {company.title}
                    </div>
                    {this.renderSite()}
                    {this.renderDescription()}
                  </div>
                </article>
              </div>
              <div className="company-violations">
                <h2>
                  Порушення компанії
                </h2>
                {this.renderViolations()}
                <button onClick={()=>this.props.onAddViolation(company._id)} className="add-violation">Додати порушення</button>
              </div>
              <div className="company-categories-holder">
                <h2>
                  Сфери діяльності
                </h2>
                <ul className="company-categories">
                  {this.renderCategories()}
                  <li className="add">
                    <a href={"/addCategory?company_id="+company._id} data-ajax-dialog="addCategory" data-ajax-url={"/addCategory?company_id="+company._id}>
                      Додати сферу
                    </a>
                  </li>
                </ul>
              </div>
            </section>
            <div className="bottom-space">
              <CompanyComments
                loggedUser={this.props.loggedUser}
                commentsCount={this.props.commentsCount}
                comments={this.props.comments}
                company={this.props.company}
                currentPage={this.props.currentPage}
                totalPages={this.props.totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CompanyPage.propTypes = {
  company: PropTypes.object,
  loggedUser: PropTypes.object,
  commentsCount: PropTypes.number,
  comments: PropTypes.array,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onAddViolation: PropTypes.func,
};

export default CompanyPage;
