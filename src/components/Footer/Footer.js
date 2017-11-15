import React from 'react';
import PropTypes from 'prop-types';

import MenuItems from 'components/MenuItems';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <nav>
            <MenuItems className="footer-menu" loggedUser={this.props.loggedUser}/>
          </nav>
          <div className="footer-helpers">
            <a href="https://www.facebook.com/groups/i.tak.poymut" target="_blank" title="facebook" className="facebook" />
            <a href="#top" title="Нагору" className="up" />
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  loggedUser: PropTypes.object,
};

export default Footer;
