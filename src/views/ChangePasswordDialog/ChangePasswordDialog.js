import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Helmet } from 'react-helmet';

import Password from 'components/Password';
import { preventDefault } from 'utils';

class ChangePasswordDialog extends React.PureComponent {
  state = {
    password: '',
    newPassword: '',
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };

  render() {
    const { errors = {} } = this.props;
    const { password, newPassword } = this.state;
    const onSubmit = preventDefault(this.handleSubmit);
    return (
      <React.Fragment>
        <Helmet>
          <title>Змінити пароль</title>
        </Helmet>
        <div className="dialog_content">
          <h1>Змінити пароль</h1>
          <form onSubmit={onSubmit}>
            <div className={cn('row', { 'row--error': errors.password })}>
              <label className="row__label" htmlFor="password">
                {errors.password || 'Існуючий пароль'}
              </label>
              <Password
                id="password"
                className="row__input higher password"
                name="password"
                value={password}
                onChange={this.onInputChange}
                maxLength="25"
              />
            </div>
            <div className={cn('row', { 'row--error': errors.newPassword })}>
              <label className="row__label" htmlFor="newPassword">
                {errors.newPassword || 'Новий пароль'}
              </label>
              <Password
                id="newPassword"
                className="row__input higher password"
                name="newPassword"
                value={newPassword}
                onChange={this.onInputChange}
                maxLength="25"
              />
            </div>
            <button className="dialog__button" type="submit">
              Змінити
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

ChangePasswordDialog.propTypes = {
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default ChangePasswordDialog;
