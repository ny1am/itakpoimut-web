import React from 'react';
import PropTypes from 'prop-types';

import MenuItems from 'components/MenuItems';

class MobileMenu extends React.Component {
  render() {
    return (
      <section id="mobile-menu" className="mobile-menu">
        <header className="mobile-menu__header">
          <a href="#" className="close" />
          <h1>
            <q>И так поймут</q> каталог <abbr title="Засоби масової інформації">ЗМІ</abbr> та бізнесу
          </h1>
        </header>
        <nav className="mobile-main-menu">
          <MenuItems className="mobile-main-menu" loggedUser={this.props.loggedUser}/>
        </nav>
      </section>
    );
  }
}

MobileMenu.propTypes = {
  loggedUser: PropTypes.object,
};

export default MobileMenu;
