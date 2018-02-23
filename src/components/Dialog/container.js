import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DialogComponent from './Dialog';

class DialogContainer extends React.Component {

  constructor(props) {
    super(props);
    this.changeLoading = this.changeLoading.bind(this);
    this.state = {
      loading: false,
    };
  }

  changeLoading(loading) {
    this.setState({ loading });
  }

  render() {
    const { dialogType, loggedUser, ...props } = this.props;
    const { loading } = this.state;
    if (!dialogType) {
      return null;
    }
    return (<DialogComponent
      dialogType={dialogType}
      loading={loading}
      changeLoading={this.changeLoading}
      loggedUser={loggedUser}
      {...props}
    />);
  }

}

const mapStateToProps = ({ router, auth }) => {
  const dialogState = router.location.state || {};
  return {
    dialogType: dialogState.dialogType || null,
    loggedUser: auth.loggedUser,
  };
};

DialogContainer.propTypes = {
  dialogType: PropTypes.string,
  loggedUser: PropTypes.object,
};

export default connect(mapStateToProps)(DialogContainer);
