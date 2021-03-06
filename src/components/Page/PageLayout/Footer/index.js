import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { userLinks } from '../Menu';

import styles from './styles.scss';

const gotoTop = () => {
  window.scrollTo(0, 0);
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <nav>
          <ul className={styles.menu}>
            {userLinks.map((item, index) => (
              <li key={index}>
                <Link to={item.location}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.helpers}>
          <a
            href="https://www.facebook.com/groups/i.tak.poymut"
            target="_blank"
            rel="noopener"
            title="facebook"
            className={cn(styles.facebook, styles.btn)}
          />
          <button
            onClick={gotoTop}
            title="Нагору"
            className={cn(styles.up, styles.btn)}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
