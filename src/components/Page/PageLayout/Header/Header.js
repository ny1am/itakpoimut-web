import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DialogLink from 'components/DialogLink';
import Avatar from 'components/Avatar';

import styles from './styles.scss';

const Header = ({ loggedUser, onLogout, onMenuShow }) => (
  <React.Fragment>
    <header className={styles.desktop}>
      <div className="container">
        <Link className={styles.logo} to="/">
          <q>И так поймут</q> каталог{' '}
          <abbr title="Засоби масової інформації">ЗМІ</abbr> та бізнесу
        </Link>
        <div className={styles.aside}>
          {loggedUser ? (
            <React.Fragment>
              <Link key="userpick" to="/user-profile">
                <Avatar
                  className={styles.userpic}
                  user={loggedUser}
                  size={48}
                />
              </Link>
              <Link key="fname" to="/user-profile" className={styles.name}>
                {loggedUser.fname}
              </Link>
              <button
                key="logout"
                className={styles.logout}
                onClick={onLogout}
              />
            </React.Fragment>
          ) : (
            <DialogLink to="/login" className={styles.login}>
              Вхід/Реєстрація
            </DialogLink>
          )}
        </div>
      </div>
    </header>
    <header className={styles.mobile}>
      <button className={styles.menu} onClick={onMenuShow} />
      <div className={styles.buttons}>
        <DialogLink to="/create-company" className={styles.addCompany} />
        <Link to="/companies" className={styles.search} />
        {loggedUser ? (
          <React.Fragment>
            <Link key="profile" to="/user-profile" className={styles.user} />
            <button key="logout" className={styles.logout} onClick={onLogout} />
          </React.Fragment>
        ) : (
          <DialogLink to="/login" className={styles.user} />
        )}
      </div>
    </header>
  </React.Fragment>
);

Header.propTypes = {
  loggedUser: PropTypes.shape({
    fname: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func.isRequired,
  onMenuShow: PropTypes.func.isRequired,
};

export default Header;
