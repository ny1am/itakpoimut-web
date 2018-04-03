import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import DialogComponent from './Dialog';
import { LoadingProvider } from 'components/Form';
import { hideIfNoData } from 'utils/enhancers';

class DialogContainer extends React.Component {

  render() {
    const { dialogType, loggedUser } = this.props;
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

const hasNoData = props => !(props.dialogType);

const mapStateToProps = ({ router, auth }) => {
  const dialogState = router.location.state || {};
  return {
    dialogType: dialogState.dialogType || null,
    loggedUser: auth.loggedUser,
  };
};

export default compose(
  connect(mapStateToProps),
  hideIfNoData(hasNoData),
)(DialogContainer);
