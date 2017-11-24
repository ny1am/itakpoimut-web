import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
        <button className="mobile-user" onClick={this.props.onLogin} />
      );
    }
  }
  render() {
    return (
      <header className="mobile-header">
        <a href="#mobile-menu" className="menu-button" />
        <div className="mobile-header-buttons">
          <button className="mobile-add-company" onClick={this.props.onCreateCompany} />
          <Link to="/companies" className="mobile-search" />
          {this.renderUserLinks()}
        </div>
      </header>
    );
  }
}

MobileHeader.propTypes = {
  loggedUser: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onCreateCompany: PropTypes.func.isRequired,
};

export default MobileHeader;
