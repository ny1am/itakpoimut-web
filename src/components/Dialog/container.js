import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DialogComponent from './Dialog';

class DialogContainer extends React.Component {

  constructor(props) {
    super(props);
    this.changeLoading = (loading => this.setState({ loading })).bind(this);
    this.state = {
      loading: false,
    };
  }

  getChildContext = () => ({
    loading: this.state.loading,
    changeLoading: this.changeLoading,
  });

  render() {
    const { dialogType, loggedUser } = this.props;
    if (!dialogType) {
      return null;
    }
    return (<DialogComponent
      dialogType={dialogType}
      loggedUser={loggedUser}
    />);
  }
}

DialogContainer.childContextTypes = {
  loading: PropTypes.bool.isRequired,
  changeLoading: PropTypes.func.isRequired,
};

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
