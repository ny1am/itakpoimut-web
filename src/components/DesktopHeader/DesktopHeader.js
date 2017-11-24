import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { LOGIN_DIALOG } from 'constants/dialog';
import DialogLink from 'components/DialogLink';
import { avatar } from 'utils';

class DesktopHeader extends React.Component {
  renderUserLinks() {
    const loggedUser = this.props.loggedUser;
    if (loggedUser) {
      return [
        <Link key="userpick" to="/userProfile">
          <img className="header-userpic" src={avatar(loggedUser.picture_url, 48)} />
        </Link>,
        <Link key="fname" to="/userProfile" className="header-name">
          {loggedUser.fname}
        </Link>,
        <button key="logout" className="header-logout" onClick={this.props.onLogout} />
      ];
    } else {
      return (
        <DialogLink dialogType={LOGIN_DIALOG} className="header-login">
          Вхід/Реєстрація
        </DialogLink>
      );
    }
  }
  render() {
    return (
      <header className="desktop-header">
        <div className="container">
          <Link className="header-logo" to="/">
            <q>И так поймут</q> каталог <abbr title="Засоби масової інформації">ЗМІ</abbr> та бізнесу
          </Link>
          <div className="header-right">
            {this.renderUserLinks()}
          </div>
        </div>
      </header>
    );
  }
}

DesktopHeader.propTypes = {
  loggedUser: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

export default DesktopHeader;
