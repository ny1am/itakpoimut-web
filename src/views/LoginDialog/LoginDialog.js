import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Helmet } from 'react-helmet';

import SocialLoginSection from 'components/SocialLoginSection';
import DialogLink from 'components/DialogLink';
import Password from 'components/Password';
import { preventDefault } from 'utils';

import styles from './styles.scss';

class LoginDialog extends React.PureComponent {
  state = {
    username: '',
    password: '',
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    return this.props.onSubmit('form', this.state);
  };

  handleFacebookSubmit = (accessToken) => {
    //todo handle empty accessToken
    return this.props.onSubmit('facebook', accessToken);
  };

  handleGoogleSubmit = (accessToken) => {
    //todo handle empty accessToken
    return this.props.onSubmit('google', accessToken);
  };

  render() {
    const { errors = {} } = this.props;
    const onSubmit = preventDefault(this.handleSubmit);
    return (
      <React.Fragment>
        <Helmet>
          <title>Вхід</title>
        </Helmet>
        <div className={cn('dialog_content', styles.wrapper)}>
          <h1>Вхід</h1>
          {errors.global && <div className={styles.error}>{errors.global}</div>}
          <SocialLoginSection
            handleFacebookSubmit={this.handleFacebookSubmit}
            handleGoogleSubmit={this.handleGoogleSubmit}
          />
          <form onSubmit={onSubmit}>
            <div className={cn('row', { 'row--error': errors.username })}>
              <label className="row__label" htmlFor="username">
                {errors.username || 'E-mail'}
              </label>
              <input
                type="email"
                className="row__input higher"
                name="username"
                value={this.state.username}
                onChange={this.onInputChange}
                maxLength="50"
              />
            </div>
            <div className={cn('row', { 'row--error': errors.password })}>
              <label className="row__label" htmlFor="password">
                {errors.password || 'Пароль'}
              </label>
              <Password
                type="password"
                id="loginPassword"
                className="row__input higher password"
                name="password"
                value={this.state.password}
                onChange={this.onInputChange}
                maxLength="25"
              />
              <aside className={styles.forget}>
                <DialogLink to="/forget-password">Забули пароль?</DialogLink>
              </aside>
            </div>
            <button className="dialog__button" type="submit">
              Ввійти
            </button>
          </form>
          <aside className="dialog__aside">
            <DialogLink to="/signup">Реєстрація</DialogLink>
          </aside>
        </div>
      </React.Fragment>
    );
  }
}

LoginDialog.propTypes = {
  errors: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default LoginDialog;
