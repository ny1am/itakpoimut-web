import React from 'react';
import PropTypes from 'prop-types';

import DialogLink from 'components/DialogLink';
import { preventDefault } from 'utils';

import styles from './styles.scss';

class ForgetPasswordDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
    };
  }

  handleEmailChange(e) {
    const email = e.target.value;
    this.setState({ email });
  }

  handleSubmit() {
    this.props.onSubmit(this.state.email);
  }

  render() {
    const errors = this.props.errors || {};
    const emailClass = errors.email?'row--error':'';
    const { email } = this.state;
    const onSubmit = preventDefault(this.handleSubmit);
    return (
      <div className={`dialog_content ${styles.wrapper}`}>
        <h1>
          Відновлення паролю
        </h1>
        <p>
          Вкажіть, будь ласка, e-mail, і ми скинемо вам посилання на відновлення паролю
        </p>
        <form action="/forgot" method="post" noValidate onSubmit={onSubmit}>
          <div className={emailClass+' row'}>
            <label className="row__label" htmlFor="email">
              {errors.email || 'E-mail'}
            </label>
            <input
              type="email"
              className="row__input higher"
              name="email"
              value={email}
              onChange={this.handleEmailChange}
              maxLength="50"
            />
          </div>
          <button className="dialog__button" type="submit">
            Надіслати
          </button>
        </form>
        <aside className="dialog__aside">
          <DialogLink to="/dialog/login" className="regularLink">
            Я згадав/ла пароль
          </DialogLink>
        </aside>
      </div>
    );
  }
}

ForgetPasswordDialog.propTypes = {
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default ForgetPasswordDialog;
