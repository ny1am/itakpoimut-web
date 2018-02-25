import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hideDialog } from 'actions/dialog';

import DialogLayoutComponent from './DialogLayout';

class DialogLayoutContainer extends React.PureComponent {
  render() {
    const { loading } = this.context;
    return <DialogLayoutComponent loading={loading} {...this.props} />;
  }
}

DialogLayoutContainer.contextTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(hideDialog()),
  dispatch
});

export default connect(null, mapDispatchToProps)(DialogLayoutContainer);
