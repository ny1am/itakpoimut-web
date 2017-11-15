import React from 'react';
import PropTypes from 'prop-types';

class MobileHeader extends React.Component {
  renderUserLinks() {
    const loggedUser = this.props.loggedUser;
    if (loggedUser) {
      return [
        <a key="profile" href="/userProfile" className="mobile-user" />,
        <a key="logout" href="/logout" className="mobile-logout" />
      ];
    } else {
      return (
        <a href="/login" data-ajax-dialog="login" className="mobile-user" />
      );
    }
  }
  render() {
    return (
      <header className="mobile-header">
        <a href="#mobile-menu" className="menu-button" />
        <div className="mobile-header-buttons">
          <a href="/createCompany" className="mobile-add-company" data-ajax-dialog="createCompany" data-ajax-url="/createCompany" />
          <a href="/companies" className="mobile-search" />
          {this.renderUserLinks()}
        </div>
      </header>
    );
  }
}

MobileHeader.propTypes = {
  loggedUser: PropTypes.object,
};

export default MobileHeader;
