import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import AdminButton from 'components/AdminButton';
import DialogLink from 'components/DialogLink';
import { roleModerator } from 'utils';

import userLinks from './userLinks';
import styles from './styles.scss';

class Menu extends React.PureComponent {

  renderAdminLink() {
    const { loggedUser } = this.props;
    if (roleModerator(loggedUser)) {
      return (
        <li>
          <AdminButton className={styles.admin} />
        </li>
      );
    }
    return null;
  }

  render() {
    const { shown, onMenuHide } = this.props;
    return (
      <React.Fragment>
        <nav className={styles.desktop}>
          <div className={cn('container', styles.container)}>
            <ul className={styles.menu}>
              {userLinks.map((item, index) => (
                <li key={index}>
                  <Link to={item.location}>
                    {item.title}
                  </Link>
                </li>
              ))}
              {this.renderAdminLink()}
            </ul>
            <div className={styles.aside}>
              <Link className={styles.search} to="/companies" />
              <DialogLink
                to="/create-company"
                className={styles.addCompany}
              >
                Запропонувати компанію
              </DialogLink>
            </div>
          </div>
        </nav>
        <section className={cn(
          styles.mobile,
          { [styles.shown]: shown }
        )}>
          <div className={styles.content}>
            <header className={styles.header}>
              <button className={styles.close} onClick={onMenuHide} />
              <h1>
                <q>И так поймут</q> каталог <abbr title="Засоби масової інформації">ЗМІ</abbr> та бізнесу
              </h1>
            </header>
            <nav className={styles.menuWrapper}>
              <ul className={styles.menu}>
                {userLinks.map((item, index) => (
                  <li key={index}>
                    <Link to={item.location}>
                      {item.title}
                    </Link>
                  </li>
                ))}
                {this.renderAdminLink()}
              </ul>
            </nav>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

Menu.propTypes = {
  loggedUser: PropTypes.object,
  shown: PropTypes.bool.isRequired,
  onMenuHide: PropTypes.func.isRequired,
};

export default Menu;
