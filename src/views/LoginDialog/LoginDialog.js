import React from 'react';
import PropTypes from 'prop-types';

import SocialLoginSection from 'components/SocialLoginSection';
import DialogLink from 'components/DialogLink';
import Password from 'components/Password';

import styles from './styles.scss';

class LoginDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFacebookSubmit = this.handleFacebookSubmit.bind(this);
    this.handleGoogleSubmit = this.handleGoogleSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
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
    this.props.onSubmit('form', this.state);
  }

  handleFacebookSubmit(accessToken) {
    //todo handle empty accessToken
    this.props.onSubmit('facebook', accessToken);
  }

  handleGoogleSubmit(accessToken) {
    //todo handle empty accessToken
    this.props.onSubmit('google', accessToken);
  }

  render() {
    const errors = this.props.errors || {};
    const usernameClass = errors.username?'row--error':'';
    const passwordClass = errors.password?'row--error':'';
    return (
      <div className="dialog_content">
        <h1>
          Вхід
        </h1>
        {errors.global &&
          <div className={styles.error}>
            {errors.global}
          </div>
        }
        <SocialLoginSection
          handleFacebookSubmit={this.handleFacebookSubmit}
          handleGoogleSubmit={this.handleGoogleSubmit}
        />
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
            <aside className={styles.forget}>
              <DialogLink to="/dialog/forget-password">
                Забули пароль?
              </DialogLink>
            </aside>
          </div>
          <button className="dialog__button" type="submit">
            Ввійти
          </button>
        </form>
        <aside className="dialog__aside">
          <DialogLink to="/dialog/signup" className="regularLink">
            Реєстрація
          </DialogLink>
        </aside>
      </div>
    );
  }
}

LoginDialog.propTypes = {
  errors: PropTypes.object,
  onSubmit: PropTypes.func,
};

LoginDialog.defaultProps = {
  errors: {}
};

export default LoginDialog;
