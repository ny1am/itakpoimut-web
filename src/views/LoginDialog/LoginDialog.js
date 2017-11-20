import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'components/Checkbox';
import Password from 'components/Password';

class LoginDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: props.username || '',
      password: props.password || '',
    };
  }

  handleUsernameChange(e) {
    const username = e.target.value;
    this.setState({ username });
  }

  handlePasswordChange(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.onSubmit(username, password);
  }

  renderMessage() {
    if (this.props.message && this.props.message.length !== 0) {
      return (
        <div className="notification-message">
          {this.props.message}
        </div>
      );
    } else {
      return null;
    }
  }
  render() {
    const errors = this.props.errors || {};
    const usernameClass = errors.username?'row--error':'';
    const passwordClass = errors.password?'row--error':'';
    return (
      <div className="dialog_content">
        <h1 className="dialog__h1">
          Вхід
        </h1>
        {this.renderMessage()}
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
        <form action="/login" method="post" onSubmit={this.handleSubmit}>
          <div className={usernameClass+' row'}>
            <label className="row__label" htmlFor="username">
              {errors.username || 'E-mail'}
            </label>
            <input type="email"
              className="row__input higher"
              name="username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              maxLength="50"
            />
          </div>
          <div className={passwordClass+' row'}>
            <label className="row__label" htmlFor="password">
              {errors.password || 'Пароль'}
            </label>
            <Password type="password"
              id="loginPassword"
              className="row__input higher password"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              maxLength="25"
            />
            <aside className="row--aside">
              <Checkbox id="rememberme" name="rememberme" value="true" defaultChecked={this.props.rememberme||false} />
              <label htmlFor="rememberme" className="label--small">
                Пам'ятати мене
              </label>
              <a href="/forgot" className="right-link" data-ajax-dialog="forgot">
                Забули пароль?
              </a>
            </aside>
          </div>
          <button className="dialog__button" type="submit" data-ajax-submit-dialog="login">
            Ввійти
          </button>
        </form>
        <aside className="dialog__aside">
          <a href="/signup" data-ajax-dialog="signup">Реєстрація</a>
        </aside>
      </div>
    );
  }
}

LoginDialog.propTypes = {
  errors: PropTypes.object,
  message: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  rememberme: PropTypes.bool,
  onSubmit: PropTypes.func,
};

LoginDialog.defaultProps = {
  errors: {}
};

export default LoginDialog;
