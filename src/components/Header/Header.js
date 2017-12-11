import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { LOGIN_DIALOG, CREATE_COMPANY_DIALOG } from 'constants/dialog';
import DialogLink from 'components/DialogLink';
import Avatar from 'components/Avatar';

const Header = ({ loggedUser, onLogout }) => (
  <React.Fragment>
    <header className="desktop-header">
      <div className="container">
        <Link className="header-logo" to="/">
          <q>И так поймут</q> каталог <abbr title="Засоби масової інформації">ЗМІ</abbr> та бізнесу
        </Link>
        <div className="header-right">
          {loggedUser ?
            <React.Fragment>
              <Link key="userpick" to="/userProfile">
                <Avatar className="header-userpic" user={loggedUser} size={48} />
              </Link>
              <Link key="fname" to="/userProfile" className="header-name">
                {loggedUser.fname}
              </Link>
              <button key="logout" className="header-logout" onClick={onLogout} />
            </React.Fragment>
          :
            <DialogLink dialogType={LOGIN_DIALOG} className="header-login">
              Вхід/Реєстрація
            </DialogLink>
          }
        </div>
      </div>
    </header>
    <header className="mobile-header">
      <a href="#mobile-menu" className="menu-button" />
      <div className="mobile-header-buttons">
        <DialogLink dialogType={CREATE_COMPANY_DIALOG} className="mobile-add-company" />
        <Link to="/companies" className="mobile-search" />
        {loggedUser ?
          <React.Fragment>
            <Link key="profile" to="/userProfile" className="mobile-user" />
            <button key="logout" className="mobile-logout" onClick={onLogout} />
          </React.Fragment>
        :
          <DialogLink dialogType={LOGIN_DIALOG} className="mobile-user" />
        }
      </div>
    </header>
  </React.Fragment>
);

Header.propTypes = {
  loggedUser: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
