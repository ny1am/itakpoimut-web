import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

const SuccessView = ({ title = 'Дякуємо!', children }) => (
  <div className={cn('dialog_content', styles.wrapper)}>
    <h1>
      {title}
    </h1>
    <div className={styles.icon} />
    {children}
  </div>
);

SuccessView.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default SuccessView;
