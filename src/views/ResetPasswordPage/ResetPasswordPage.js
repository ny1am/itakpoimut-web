import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Password from 'components/Password';
import DialogLink from 'components/DialogLink';
import { preventDefault } from 'utils';

import styles from './styles.scss';

class ResetPasswordPage extends React.PureComponent {
  state = {
    password: '',
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    const { password } = this.state;
    const { token } = this.props.match.params;
    this.props.onSubmit({
      token,
      password,
    });
  };

  render() {
    const { errors = {} } = this.props;
    const { password } = this.state;
    const onSubmit = preventDefault(this.onSubmit);
    return (
      <div className={cn('dialog_content', styles.wrapper)}>
        <h1>Змінити пароль</h1>
        {errors.expired && (
          <div className={styles.error}>
            {`Термін дії посилання закінчився. Подайте ще один `}
            <DialogLink className={styles.link} to="/forget-password">
              запит
            </DialogLink>
            {` на зміну паролю.`}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className={cn('row', { 'row--error': errors.password })}>
            <label className="row__label" htmlFor="password">
              {errors.password || 'Новий пароль'}
            </label>
            <Password
              className="row__input higher"
              name="password"
              value={password}
              onChange={this.onInputChange}
              maxLength="25"
            />
          </div>
          <button className="dialog__button" type="submit">
            Змінити
          </button>
        </form>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  errors: PropTypes.object,
  match: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ResetPasswordPage;
