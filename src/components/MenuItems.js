import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { roleModerator } from 'utils';

class MenuItems extends React.Component {
  renderModeratorLinks() {
    if (roleModerator(this.props.loggedUser)) {
      return (
        <li>
          <Link to="/admin">
            Адмінка
          </Link>
        </li>
      );
    } else {
      return null;
    }
  }
  render() {
    return (
      <ul className={this.props.className}>
        <li>
          <Link to="/">
            Головна
          </Link>
        </li>
        <li>
          <Link to="/companies">
            Всі компанії
          </Link>
        </li>
        <li>
          <Link to="/about">
            Про нас
          </Link>
        </li>
        {this.renderModeratorLinks()}
      </ul>
    );
  }
}

MenuItems.propTypes = {
  loggedUser: PropTypes.object,
  className: PropTypes.string,
};

export default MenuItems;
