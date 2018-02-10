import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showDialog } from 'actions/dialog';

const DialogLink = (props) => {
  const { to, showDialog, children, ...rest } = props;
  const onClick = () => showDialog(to);
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
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  showDialog: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DialogLink);
