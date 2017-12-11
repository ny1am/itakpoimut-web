import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CREATE_COMPANY_DIALOG } from 'constants/dialog';
import DialogLink from 'components/DialogLink';
import MenuItems from 'components/MenuItems';

class Menu extends React.Component {
  render() {
    const { loggedUser, shown, onMenuHide } = this.props;
    const mobileClassName = `mobile-menu ${shown?'shown':''}`;
    return (
      <React.Fragment>
        <nav className="main-menu">
          <div className="container menu-container">
            <MenuItems className="menu" loggedUser={loggedUser}/>
            <div className="menu-right">
              <Link className="search-ico" to="/companies" />
              <DialogLink dialogType={CREATE_COMPANY_DIALOG} className="simple">
                Запропонувати компанію
              </DialogLink>
            </div>
          </div>
        </nav>
        <section className={mobileClassName}>
          <header className="mobile-menu__header">
            <button className="close" onClick={onMenuHide} />
            <h1>
              <q>И так поймут</q> каталог <abbr title="Засоби масової інформації">ЗМІ</abbr> та бізнесу
            </h1>
          </header>
          <nav className="mobile-main-menu">
            <MenuItems className="mobile-main-menu" loggedUser={loggedUser}/>
          </nav>
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
