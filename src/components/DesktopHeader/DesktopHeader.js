import React from 'react';
import PropTypes from 'prop-types';

import { avatar } from 'utils';

class DesktopHeader extends React.Component {
  renderUserLinks() {
    const loggedUser = this.props.loggedUser;
    if (loggedUser) {
      return [
        <a key="userpick" href="/userProfile">
          <img className="header-userpic" src={avatar(loggedUser.picture_url, 48)} />
        </a>,
        <a key="fname" href="/userProfile" className="header-name">
          {loggedUser.fname}
        </a>,
        <a key="logout" href="/logout" className="header-logout" />
      ];
    } else {
      return (
        <a href="/login" className="header-login" data-ajax-dialog="login">
          Вхід/Реєстрація
        </a>
      );
    }
  }
  render() {
    return (
      <header className="desktop-header">
        <div className="container">
          <a className="header-logo" href="/">
            <q>И так поймут</q> каталог <abbr title="Засоби масової інформації">ЗМІ</abbr> та бізнесу
          </a>
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
};

export default DesktopHeader;
