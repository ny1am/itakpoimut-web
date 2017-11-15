import React from 'react';
import PropTypes from 'prop-types';

import MenuItems from 'components/MenuItems';

class MainMenu extends React.Component {
  render() {
    return (
      <nav className="main-menu">
        <div className="container menu-container">
          <MenuItems className="menu" loggedUser={this.props.loggedUser}/>
          <div className="menu-right">
            <a className="search-ico" href="/companies" />
            <button className="simple" data-ajax-dialog="createCompany" data-ajax-url="/createCompany">
              Запропонувати компанію
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

MainMenu.propTypes = {
  loggedUser: PropTypes.object,
};

export default MainMenu;
