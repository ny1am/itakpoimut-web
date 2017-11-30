import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'components/Avatar';
import FileUpload from 'components/FileUpload';

class UserProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.handleFnameChange = this.handleFnameChange.bind(this);
    this.handleLnameChange = this.handleLnameChange.bind(this);
    this.handleAttachment = this.handleAttachment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const user = props.user || {};
    this.state = {
      fname: user.fname || '',
      lname: user.lname || '',
      userpic: null,
    };
  }

  handleFnameChange(e) {
    const fname = e.target.value;
    this.setState({ fname });
  }

  handleLnameChange(e) {
    const lname = e.target.value;
    this.setState({ lname });
  }

  handleAttachment(userpic) {
    this.setState({ userpic });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    const errors = this.props.errors || {};
    const user = this.props.user || {};
    const fnameClass = errors.fname?'row--error':'';
    const lnameClass = errors.lname?'row--error':'';
    const successSave = !!this.props.successSave;
    return (
      <div className="pattern-content">
        <div className="container">
          <div className="page-content">
            {successSave &&
              <div className="dialog-success">
                Зміни збережено
              </div>
            }
            {errors.page &&
              <div className="dialog-error">
                {errors.page}
              </div>
            }
            <form action="/userProfile" method="post" onSubmit={this.handleSubmit}>
              <section className="page-block">
                <h1 className="page__h1">
                  Ваші особисті дані
                </h1>
                <div className="row">
                  <label className="row__label">
                    E-mail
                  </label>
                  <div className="row-text">
                    {user.email}
                  </div>
                </div>
                <div className={fnameClass+' row'}>
                  <label className="row__label" htmlFor="fname">
                    {errors.fname || 'Ім\'я'}
                  </label>
                  <input type="text"
                    className="row__input"
                    name="fname"
                    value={this.state.fname}
                    onChange={this.handleFnameChange}
                    maxLength="25"
                  />
                </div>
                <div className={lnameClass+' row'}>
                  <label className="row__label" htmlFor="lname">
                    {errors.lname || 'Прізвище'}
                  </label>
                  <input type="text"
                    className="row__input"
                    name="lname"
                    value={this.state.lname}
                    onChange={this.handleLnameChange}
                    maxLength="25"
                  />
                </div>
              </section>

              <section className="page-block">
                <h1 className="page__h1">
                  Ваше фото
                </h1>
                <FileUpload key={successSave} className="userpic" error={!!errors.userpic} onChange={this.handleAttachment}>
                  <Avatar user={this.props.user} />
                </FileUpload>
                <div className="hint">
                  JPEG або PNG,<br/> розміром до 1 Mb
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
    );
  }
}

UserProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object,
  successSave: PropTypes.bool,
  onSubmit: PropTypes.func,
};

UserProfilePage.defaultProps = {
  errors: {}
};

export default UserProfilePage;
