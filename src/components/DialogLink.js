import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DialogLink = ({ dialogType, dialogProps, children, ...restProps }) => (
  <Link to={{state: {dialogType, dialogProps}}} {...restProps}>
    {children}
  </Link>
);

DialogLink.propTypes = {
  /**
   * dialog type
   */
  dialogType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  /**
   * Specific dialog props
   */
  dialogProps: PropTypes.object,
  children: PropTypes.node,
};

export default DialogLink;
