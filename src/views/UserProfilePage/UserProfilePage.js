import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import randomstring from 'randomstring';
import cn from 'classnames';

import FileUpload from 'components/FileUpload';
import DialogLink from 'components/DialogLink';
import { preventDefault } from 'utils';
import { userLocalProviderCheck } from 'utils/secure';

import styles from './styles.scss';

class UserProfilePage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { user = {} } = props;
    this.state = {
      fname: user.fname || '',
      lname: user.lname || '',
      userpic: null,
      submitKey: randomstring.generate(7),
    };
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleAttachment = (userpic) => {
    this.setState({ userpic });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state).finally(() => {
      this.setState({ submitKey: randomstring.generate(7) });
    });
  };

  render() {
    const { errors = {}, user = {} } = this.props;
    const success = !!this.props.success;
    const { submitKey } = this.state;
    const onSubmit = preventDefault(this.handleSubmit);
    return (
      <React.Fragment>
        <Helmet>
          <title>Особистий кабінет</title>
        </Helmet>
        <div className="pattern-content">
          <div className="container">
            <div className={styles.content}>
              {success && <div className={styles.success}>Зміни збережено</div>}
              {errors.page && <div className={styles.error}>{errors.page}</div>}
              <form action="/userProfile" method="post" onSubmit={onSubmit}>
                <section className={styles.block}>
                  <h1>Ваші особисті дані</h1>
                  <div className="row">
                    <label className="row__label">E-mail</label>
                    <div className={styles.rowText}>{user.email}</div>
                  </div>
                  <div className={cn('row', { 'row--error': errors.fname })}>
                    <label className="row__label" htmlFor="fname">
                      {errors.fname || "Ім'я"}
                    </label>
                    <input
                      type="text"
                      className="row__input"
                      name="fname"
                      value={this.state.fname}
                      onChange={this.onInputChange}
                      maxLength="25"
                    />
                  </div>
                  <div className={cn('row', { 'row--error': errors.lname })}>
                    <label className="row__label" htmlFor="lname">
                      {errors.lname || 'Прізвище'}
                    </label>
                    <input
                      type="text"
                      className="row__input"
                      name="lname"
                      value={this.state.lname}
                      onChange={this.onInputChange}
                      maxLength="25"
                    />
                  </div>
                  {userLocalProviderCheck(user) && (
                    <div className="row">
                      <DialogLink className={styles.link} to="/change-password">
                        Змінити пароль
                      </DialogLink>
                    </div>
                  )}
                </section>

                <section className={styles.block}>
                  <h1>Ваше фото</h1>
                  <FileUpload
                    imgSrc={user.picture_url}
                    className={styles.userpic}
                    serverError={!!errors.userpic}
                    onChange={this.handleAttachment}
                    stateKey={submitKey}
                  />
                  <div className="hint">
                    JPEG або PNG,<br /> розміром до 1 Mb
                  </div>
                </section>

                <div className="row">
                  <button className="page__button" type="submit">
                    Зберегти зміни
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

UserProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object,
  success: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default UserProfilePage;
