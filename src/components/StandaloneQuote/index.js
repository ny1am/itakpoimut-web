import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const StandaloneQuote = ({className, children, ...props}) => {
  const quoteClassName = `${styles.quote} ${className||''}`;
  return (
    <q className={quoteClassName} {...props}>
      {children}
    </q>
  );
};

StandaloneQuote.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default StandaloneQuote;
