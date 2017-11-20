import React from 'react';
import PropTypes from 'prop-types';

class UserProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.handleFnameChange = this.handleFnameChange.bind(this);
    this.handleLnameChange = this.handleLnameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const user = props.user || {};
    this.state = {
      fname: user.fname || '',
      lname: user.lname || '',
    };
  }

  handleFnameChange(e) {
    const fname = e.target.value;
    this.setState({ fname });
  }

  handleLnameChange(e) {
    const lname = e.target.value;
    this.setState({ lname });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fname, lname } = this.state;
    this.props.onSubmit({ fname, lname });
  }

  renderMessage() {
    if (this.props.successSave) {
      return (
        <div className="dialog-success">
          Зміни збережено
        </div>
      );
    } else {
      return null;
    }
  }
  renderError() {
    const errors = this.props.errors || {};
    if (errors.page) {
      <div className="dialog-error">
        {errors.page}
      </div>;
    } else {
      return null;
    }
  }
  renderChangePasswordLink() {
    const user = this.props.user || {};
    if (user.provider === 'local') {
      return (
        <div className="row">
          <a href="/changePassword" className="form-link" data-ajax-dialog="changePassword">
            Змінити пароль
          </a>
        </div>
      );
    } else {
      return null;
    }
  }
  render() {
    const errors = this.props.errors || {};
    const user = this.props.user || {};
    const fnameClass = errors.fname?'row--error':'';
    const lnameClass = errors.lname?'row--error':'';
    return (
      <div className="pattern-content">
        <div className="container">
          <div className="page-content">
            {this.renderMessage()}
            {this.renderError()}
            <form action="/userProfile" method="post" onSubmit={this.handleSubmit}>
              <section className="page-block">
                <h1 className="page__h1">
                  Ваші особисті дані
                </h1>
                <div className="row">
                  <label className="row__label">
                    E-mail
                  </label>
                  <div className="row-text">
                    {user.email}
                  </div>
                </div>
                <div className={fnameClass+' row'}>
                  <label className="row__label" htmlFor="fname">
                    {errors.fname || 'Ім\'я'}
                  </label>
                  <input type="text"
                    className="row__input"
                    name="fname"
                    value={this.state.fname}
                    onChange={this.handleFnameChange}
                    maxLength="25"
                  />
                </div>
                <div className={lnameClass+' row'}>
                  <label className="row__label" htmlFor="lname">
                    {errors.lname || 'Прізвище'}
                  </label>
                  <input type="text"
                    className="row__input"
                    name="lname"
                    value={this.state.lname}
                    onChange={this.handleLnameChange}
                    maxLength="25"
                  />
                </div>
                {this.renderChangePasswordLink()}
              </section>
              <div className="row">
                <button className="page__button" type="submit">
                  Зберегти зміни
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UserProfilePage.propTypes = {
  user: PropTypes.object,
  errors: PropTypes.object,
  successSave: PropTypes.bool,
  onSubmit: PropTypes.func,
};

UserProfilePage.defaultProps = {
  errors: {}
};

export default UserProfilePage;
