import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showDialog } from 'actions/dialog';

const DialogLink = (props) => {
  const { dialogType, dialogProps, showDialog, children, ...rest } = props;
  const onClick = () => showDialog(dialogType, dialogProps);
  return (
    <button type="button" onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showDialog: (...args) => dispatch(showDialog(...args)),
});

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
  showDialog: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DialogLink);
