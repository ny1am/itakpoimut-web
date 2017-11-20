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
        <button className="header-login" onClick={this.props.onLogin}>
          Вхід/Реєстрація
        </button>
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
  onLogin: PropTypes.func.isRequired,
};

export default DesktopHeader;
