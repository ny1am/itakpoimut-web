import React from 'react';
import PropTypes from 'prop-types';

import Password from 'components/Password';
import { preventDefault } from 'utils';

class ChangePasswordDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      password: '',
      newPassword: '',
    };
  }

  handlePasswordChange(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  handleNewPasswordChange(e) {
    const newPassword = e.target.value;
    this.setState({ newPassword });
  }

  handleSubmit() {
    this.props.onSubmit(this.state);
  }

  render() {
    const errors = this.props.errors || {};
    const passwordClass = errors.password?'row--error':'';
    const newPasswordClass = errors.newPassword?'row--error':'';
    const onSubmit = preventDefault(this.handleSubmit);
    return (
      <div className="dialog_content">
        <h1>
          Змінити пароль
        </h1>
        <form action="/changePassword" method="post" onSubmit={onSubmit}>
          <div className={passwordClass+' row'}>
            <label className="row__label" htmlFor="password">
              {errors.password || 'Існуючий пароль'}
            </label>
            <Password
              id="password"
              className="row__input higher password"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              maxLength="25"
            />
          </div>
          <div className={newPasswordClass+' row'}>
            <label className="row__label" htmlFor="newPassword">
              {errors.newPassword || 'Новий пароль'}
            </label>
            <Password
              id="newPassword"
              className="row__input higher password"
              name="newPassword"
              value={this.state.newPassword}
              onChange={this.handleNewPasswordChange}
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

ChangePasswordDialog.propTypes = {
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default ChangePasswordDialog;
