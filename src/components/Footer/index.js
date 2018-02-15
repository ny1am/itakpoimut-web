import React from 'react';
import { Link } from 'react-router-dom';

import { userLinks } from 'components/Menu';

import styles from './styles.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <nav>
          <ul className={styles.menu}>
            {userLinks.map((item, index) => (
              <li key={index}>
                <Link to={item.location}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.helpers}>
          <a href="https://www.facebook.com/groups/i.tak.poymut" target="_blank" rel="noopener" title="facebook" className={styles.facebook} />
          <a href="#top" title="Нагору" className={styles.up} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
