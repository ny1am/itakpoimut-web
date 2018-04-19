import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { showDialog } from 'actions/dialog';
import { wrapWithConsumer } from 'utils/enhancers';
import { ViewModeContext } from 'components/View';

const DialogLink = (props) => {
  const { to, viewMode, showDialog, showPage, children, ...rest } = props;
  const action = viewMode === 'dialogInPage' ? showPage : showDialog;
  return (
    <button type="button" onClick={() => action(to)} {...rest}>
      {children}
    </button>
  );
};

DialogLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  showDialog: PropTypes.func.isRequired,
  showPage: PropTypes.func.isRequired,
  viewMode: PropTypes.oneOf(['page', 'dialog', 'dialogInPage']).isRequired,
};

const DialogLinkWithContext = wrapWithConsumer({
  Context: ViewModeContext,
  Component: DialogLink,
  propName: 'viewMode',
});

const mapDispatchToProps = (dispatch) => ({
  showDialog: (...args) => dispatch(showDialog(...args)),
  showPage: (...args) => dispatch(push(...args)),
});

export default connect(null, mapDispatchToProps)(DialogLinkWithContext);
