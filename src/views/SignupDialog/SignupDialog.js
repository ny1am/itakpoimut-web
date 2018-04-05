import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import SocialLoginSection from 'components/SocialLoginSection';
import DialogLink from 'components/DialogLink';
import Password from 'components/Password';
import { preventDefault } from 'utils';

import styles from './styles.scss';

class SignupDialog extends React.PureComponent {

  state = {
    fname: '',
    lname: '',
    email: '',
    password: '',
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const { fname, lname, email, password } = this.state;
    this.props.onSubmit('form', { fname, lname, email, password });
  }

  handleFacebookSubmit = (accessToken) => {
    //todo handle empty accessToken
    this.props.onSubmit('facebook', accessToken);
  }

  handleGoogleSubmit = (accessToken) => {
    //todo handle empty accessToken
    this.props.onSubmit('google', accessToken);
  }

  render() {
    const { fname, lname, email, password } = this.state;
    const { errors = {} } = this.props;
    const onSubmit = preventDefault(this.handleSubmit);
    return (
      <div className={cn('dialog_content', styles.wrapper)}>
        <h1>
          Реєстрація
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
        <form action="/signup" method="post" onSubmit={onSubmit}>
          <div className={cn('row', { 'row--error': errors.fname })}>
            <label className="row__label" htmlFor="fname">
              {errors.fname || 'Ім\'я'}
            </label>
            <input type="text"
              className="row__input higher"
              name="fname"
              value={fname}
              onChange={this.onInputChange}
              maxLength="25"
            />
          </div>
          <div className={cn('row', { 'row--error': errors.lname })}>
            <label className="row__label" htmlFor="lname">
              {errors.lname || 'Прізвище'}
            </label>
            <input type="text"
              className="row__input higher"
              name="lname"
              value={lname}
              onChange={this.onInputChange}
              maxLength="25"
            />
          </div>
          <div className={cn('row', { 'row--error': errors.email })}>
            <label className="row__label" htmlFor="email">
              {errors.email || 'E-mail'}
            </label>
            <input type="email"
              className="row__input higher"
              name="email"
              value={email}
              onChange={this.onInputChange}
              maxLength="50"
            />
          </div>
          <div className={cn('row', { 'row--error': errors.password })}>
            <label className="row__label" htmlFor="password">
              {errors.password || 'Пароль'}
            </label>
            <Password type="password"
              id="password"
              className="row__input higher password"
              name="password"
              value={password}
              onChange={this.onInputChange}
              maxLength="25"
            />
          </div>
          <button className="dialog__button" type="submit">
            Зареєструватись
          </button>
        </form>
        <aside className="dialog__aside">
          <DialogLink to="/login">
            У мене вже є аккаунт
          </DialogLink>
        </aside>
      </div>
    );
  }
}

SignupDialog.propTypes = {
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default SignupDialog;
