import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

//todo: rename
const SuccessDialog = ({ title = 'Дякуємо!', children }) => (
  <div className={`dialog_content ${styles.wrapper}`}>
    <h1>
      {title}
    </h1>
    <div className={styles.icon} />
    {children}
  </div>
);

SuccessDialog.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default SuccessDialog;
