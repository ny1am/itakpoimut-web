import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DialogComponent from './Dialog';

class Container extends React.Component {

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
    const { dialogType, ...props } = this.props;
    const { loading } = this.state;
    if (!dialogType) {
      return null;
    }
    return (<DialogComponent
      dialogType={dialogType}
      loading={loading}
      changeLoading={this.changeLoading}
      {...props}
    />);
  }

}

const mapStateToProps = (state) => {
  const dialogState = state.router.location.state || {};
  return {
    dialogType: dialogState.dialogType || null,
  };
};

Container.propTypes = {
  dialogType: PropTypes.string,
};

export default connect(mapStateToProps)(Container);
