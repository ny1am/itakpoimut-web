import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'components/Checkbox';
import Password from 'components/Password';

class SignupDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleFnameChange = this.handleFnameChange.bind(this);
    this.handleLnameChange = this.handleLnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      fname: props.fname || '',
      lname: props.lname || '',
      email: props.email || '',
      password: props.password || '',
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

  handleEmailChange(e) {
    const email = e.target.value;
    this.setState({ email });
  }

  handlePasswordChange(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, password } = this.state;
    this.props.onSubmit({ fname, lname, email, password });
  }

  render() {
    const { fname, lname, email, password } = this.state;
    const errors = this.props.errors || {};
    const fnameClass = errors.fname?'row--error':'';
    const lnameClass = errors.lname?'row--error':'';
    const emailClass = errors.email?'row--error':'';
    const passwordClass = errors.password?'row--error':'';
    return (
      <div id="dialog_content" className="dialog_content">
        <h1 className="dialog__h1">
          Реєстрація
        </h1>
        <div className="dialog-socials">
          <a href="/auth/facebook" className="login-fb">
            Вхід через Facebook
          </a>
          <a href="/auth/google" className="login-google">
            Вхід через Google+
          </a>
        </div>
        <div className="login-separator">
          або
        </div>
        <form action="/signup" method="post" onSubmit={this.handleSubmit}>
          <div className={fnameClass+' row'}>
            <label className="row__label" htmlFor="fname">
              {errors.fname || 'Ім\'я'}
            </label>
            <input type="text"
              className="row__input higher"
              name="fname"
              value={fname}
              onChange={this.handleFnameChange}
              maxLength="25"
            />
          </div>
          <div className={lnameClass+' row'}>
            <label className="row__label" htmlFor="lname">
              {errors.lname || 'Прізвище'}
            </label>
            <input type="text"
              className="row__input higher"
              name="lname"
              value={lname}
              onChange={this.handleLnameChange}
              maxLength="25"
            />
          </div>
          <div className={emailClass+' row'}>
            <label className="row__label" htmlFor="email">
              {errors.email || 'E-mail'}
            </label>
            <input type="email"
              className="row__input higher"
              name="email"
              value={email}
              onChange={this.handleEmailChange}
              maxLength="50"
            />
          </div>
          <div className={passwordClass+' row'}>
            <label className="row__label" htmlFor="password">
              {errors.password || 'Пароль'}
            </label>
            <Password type="password"
              id="password"
              className="row__input higher password"
              name="password"
              value={password}
              onChange={this.handlePasswordChange}
              maxLength="25"
            />
            <aside className="row--aside ">
              <Checkbox id="rememberme" name="rememberme" value="true" defaultChecked={this.props.rememberme||false} />
              <label htmlFor="rememberme" className="label--small">Пам'ятати мене</label>
            </aside>
          </div>
          <button className="dialog__button" type="submit" data-ajax-submit-dialog="signup">Зареєструватись</button>
        </form>
        <aside className="dialog__aside">
          <button onClick={this.props.onLogin}>У мене вже є аккаунт</button>
        </aside>
      </div>
    );
  }
}

SignupDialog.propTypes = {
  errors: PropTypes.object,
  fname: PropTypes.string,
  lname: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  rememberme: PropTypes.bool,
  onLogin: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

SignupDialog.defaultProps = {
  errors: {}
};

export default SignupDialog;