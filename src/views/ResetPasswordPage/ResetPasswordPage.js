import React from 'react';
import PropTypes from 'prop-types';

import Password from 'components/Password';
import DialogLink from 'components/DialogLink';
import { preventDefault } from 'utils';

import styles from './styles.scss';

class ResetPasswordPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      password: ''
    };
  }

  onPasswordChange({ target: { value } }) {
    this.setState({
      password: value
    });
  }

  onSubmit() {
    this.props.onSubmit(this.state.password);
  }

  render() {
    const errors = this.props.errors || {};
    const passwordClass = errors.password?'row--error':'';
    const { password } = this.state;
    const onSubmit = preventDefault(this.onSubmit);
    return (
      <React.Fragment>
        <h1>
          Змінити пароль
        </h1>
        {errors.expired &&
          <div className={styles.error}>
            {`Термін дії посилання закінчився. Подайте ще один `}
            <DialogLink className={styles.link} to="/dialog/forget-password">
              запит
            </DialogLink>
            {` на зміну паролю.`}
          </div>
        }
        <form action="/reset" method="post" onSubmit={onSubmit}>
          <div className={passwordClass+' row'}>
            <label className="row__label" htmlFor="password">
              {errors.password || 'Новий пароль'}
            </label>
            <Password
              className="row__input higher"
              name="password"
              value={password}
              onChange={this.onPasswordChange}
              maxLength="25"
            />
          </div>
          <button className="dialog__button" type="submit">
            Змінити
          </button>
        </form>
      </React.Fragment>
    );
  }
}

ResetPasswordPage.propTypes = {
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default ResetPasswordPage;
