import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CREATE_COMPANY_DIALOG } from 'constants/dialog';
import DialogLink from 'components/DialogLink';

import userLinks from './userLinks';
import styles from './styles.scss';

class Menu extends React.Component {
  render() {
    const { loggedUser, shown, onMenuHide } = this.props;
    const mobileClassName = `${styles.mobile} ${shown?styles.shown:''}`;
    const menuLinks = userLinks(loggedUser);
    return (
      <React.Fragment>
        <nav className={styles.desktop}>
          <div className={`container ${styles.container}`}>
            <ul className={styles.menu}>
              {menuLinks.map((item, index) => (
                <li key={index}>
                  <Link to={item.location}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.aside}>
              <Link className={styles.search} to="/companies" />
              <DialogLink dialogType={CREATE_COMPANY_DIALOG} className={styles.addCompany}>
                Запропонувати компанію
              </DialogLink>
            </div>
          </div>
        </nav>
        <section className={mobileClassName}>
          <div className={styles.content}>
            <header className={styles.header}>
              <button className={styles.close} onClick={onMenuHide} />
              <h1>
                <q>И так поймут</q> каталог <abbr title="Засоби масової інформації">ЗМІ</abbr> та бізнесу
              </h1>
            </header>
            <nav className={styles.menuWrapper}>
              {menuLinks.map((item, index) => (
                <li key={index}>
                  <Link to={item.location}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </nav>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

Menu.propTypes = {
  loggedUser: PropTypes.object,
  shown: PropTypes.bool,
  onMenuHide: PropTypes.func,
};

export default Menu;
