import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Helmet } from 'react-helmet';

import DialogLink from 'components/DialogLink';
import { preventDefault } from 'utils';

import styles from './styles.scss';

class ForgetPasswordDialog extends React.Component {
  state = {
    email: '',
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.email);
  };

  render() {
    const { errors = {} } = this.props;
    const { email } = this.state;
    const onSubmit = preventDefault(this.handleSubmit);
    return (
      <React.Fragment>
        <Helmet>
          <title>Відновлення паролю</title>
        </Helmet>
        <div className={cn('dialog_content', styles.wrapper)}>
          <h1>Відновлення паролю</h1>
          <p>
            Вкажіть, будь ласка, e-mail, і ми скинемо вам посилання на
            відновлення паролю
          </p>
          <form noValidate onSubmit={onSubmit}>
            <div className={cn('row', { 'row--error': errors.email })}>
              <label className="row__label" htmlFor="email">
                {errors.email || 'E-mail'}
              </label>
              <input
                type="email"
                noValidate
                className="row__input higher"
                name="email"
                value={email}
                onChange={this.onInputChange}
                maxLength="50"
              />
            </div>
            <button className="dialog__button" type="submit">
              Надіслати
            </button>
          </form>
          <aside className="dialog__aside">
            <DialogLink to="/login">Я згадав/ла пароль</DialogLink>
          </aside>
        </div>
      </React.Fragment>
    );
  }
}

ForgetPasswordDialog.propTypes = {
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default ForgetPasswordDialog;
