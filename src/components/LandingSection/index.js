import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const LandingSection = ({ title, children }) => (
  <section className={styles.wrapper}>
    <header className={styles.header}>{title}</header>
    {children}
  </section>
);

LandingSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LandingSection;
