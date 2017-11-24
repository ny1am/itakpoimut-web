import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MenuItems from 'components/MenuItems';

class MainMenu extends React.Component {
  render() {
    return (
      <nav className="main-menu">
        <div className="container menu-container">
          <MenuItems className="menu" loggedUser={this.props.loggedUser}/>
          <div className="menu-right">
            <Link className="search-ico" to="/companies" />
            <button className="simple" onClick={this.props.onCreateCompany}>
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
  onCreateCompany: PropTypes.func.isRequired,
};

export default MainMenu;
