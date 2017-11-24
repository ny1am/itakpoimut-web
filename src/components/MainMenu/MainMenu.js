import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CREATE_COMPANY_DIALOG } from 'constants/dialog';
import DialogLink from 'components/DialogLink';
import MenuItems from 'components/MenuItems';

class MainMenu extends React.Component {
  render() {
    return (
      <nav className="main-menu">
        <div className="container menu-container">
          <MenuItems className="menu" loggedUser={this.props.loggedUser}/>
          <div className="menu-right">
            <Link className="search-ico" to="/companies" />
            <DialogLink dialogType={CREATE_COMPANY_DIALOG} className="simple">
              Запропонувати компанію
            </DialogLink>
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
