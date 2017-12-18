import React from 'react';
import PropTypes from 'prop-types';

import MenuItems from 'components/MenuItems';

import styles from './styles.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <div className="container">
          <nav>
            <MenuItems className={styles.menu} loggedUser={this.props.loggedUser}/>
          </nav>
          <div className={styles.helpers}>
            <a href="https://www.facebook.com/groups/i.tak.poymut" target="_blank" title="facebook" className={styles.facebook} />
            <a href="#top" title="Нагору" className={styles.up} />
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
