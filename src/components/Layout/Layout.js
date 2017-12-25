import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Menu from 'components/Menu';
import Footer from 'components/Footer';

import styles from './styles.scss';

const Layout = ({ overflowShown, children }) => (
  <div className={`${styles.wrapper} ${overflowShown?styles.fixed:''}`}>
    <Header />
    <Menu />
    {children}
    <Footer />
  </div>
);

Layout.propTypes = {
  overflowShown: PropTypes.bool,
  children: PropTypes.node,
};

export default Layout;
