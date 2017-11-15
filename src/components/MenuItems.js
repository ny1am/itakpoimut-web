import React from 'react';
import PropTypes from 'prop-types';

import { roleModerator } from 'utils';

class MenuItems extends React.Component {
  renderModeratorLinks() {
    if (roleModerator(this.props.loggedUser)) {
      return (
        <li>
          <a href="/admin">
            Адмінка
          </a>
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
          <a href="/">
            Головна
          </a>
        </li>
        <li>
          <a href="/companies">
            Всі компанії
          </a>
        </li>
        <li>
          <a href="/about">
            Про нас
          </a>
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
