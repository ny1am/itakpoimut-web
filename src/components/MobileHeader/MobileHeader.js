import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { LOGIN_DIALOG, CREATE_COMPANY_DIALOG } from 'constants/dialog';
import DialogLink from 'components/DialogLink';

class MobileHeader extends React.Component {
  renderUserLinks() {
    const loggedUser = this.props.loggedUser;
    if (loggedUser) {
      return [
        <Link key="profile" to="/userProfile" className="mobile-user" />,
        <button key="logout" className="mobile-logout" onClick={this.props.onLogout} />
      ];
    } else {
      return (
        <DialogLink dialogType={LOGIN_DIALOG} className="mobile-user" />
      );
    }
  }
  render() {
    return (
      <header className="mobile-header">
        <a href="#mobile-menu" className="menu-button" />
        <div className="mobile-header-buttons">
        <DialogLink dialogType={CREATE_COMPANY_DIALOG} className="mobile-add-company" />
          <Link to="/companies" className="mobile-search" />
          {this.renderUserLinks()}
        </div>
      </header>
    );
  }
}

MobileHeader.propTypes = {
  loggedUser: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

export default MobileHeader;
