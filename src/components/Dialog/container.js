import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DialogComponent from './Dialog';
import { LoadingProvider } from 'components/Form';

class DialogContainer extends React.Component {

  render() {
    const { dialogType, loggedUser } = this.props;
    if (!dialogType) {
      return null;
    }
    return (
      <LoadingProvider>
        <DialogComponent
          dialogType={dialogType}
          loggedUser={loggedUser}
        />
      </LoadingProvider>
    );
  }
}

DialogContainer.propTypes = {
  dialogType: PropTypes.string,
  loggedUser: PropTypes.object,
};

const mapStateToProps = ({ router, auth }) => {
  const dialogState = router.location.state || {};
  return {
    dialogType: dialogState.dialogType || null,
    loggedUser: auth.loggedUser,
  };
};

export default connect(mapStateToProps)(DialogContainer);
