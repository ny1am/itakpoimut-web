import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

const StandaloneQuote = ({ className, children, ...props }) => {
  return (
    <q className={cn(styles.quote, className)} {...props}>
      {children}
    </q>
  );
};

StandaloneQuote.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default StandaloneQuote;
