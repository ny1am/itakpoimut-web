import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hideDialog } from 'actions/dialog';
import { PLEASE_SIGNUP_DIALOG } from 'constants/dialog';
import * as pageLoading from 'actions/pageLoading';

import DialogComponent from './Dialog';
import routes from './routes';


class Container extends React.Component {

  constructor(props) {
    super(props);
    this.changeLoading = this.changeLoading.bind(this);
    this.state = {
      dialogType: props.dialogType,
      isAppFetching: false,
      initialData: null,
      loading: false,
      ready: false,
    };
  }

  componentWillMount () {
    const nextDialogType = this.guardDialogType(this.state.dialogType);
    this.fetchInitialData(this.props, nextDialogType);
  }

  componentWillReceiveProps (nextProps) {
    const nextDialogType = this.guardDialogType(nextProps.dialogType);
    if (this.state.dialogType === nextDialogType || !nextDialogType) {
     return;
    }
    this.fetchInitialData(nextProps, nextDialogType);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !nextState.isAppFetching;
  }

  changeLoading(loading) {
    this.setState({ loading });
  }

  guardDialogType(dialogType) {
    let nextDialogType = dialogType;
    if (nextDialogType) {
      const route = routes[nextDialogType];
      if (route.secure && !this.props.loggedUser) {
        nextDialogType = PLEASE_SIGNUP_DIALOG;
      }
    }
    this.setState({ dialogType: nextDialogType });
    return nextDialogType;
  }

  fetchInitialData (props, dialogType) {
    if (!dialogType) {
      return;
    }
    const { dispatch, dialogProps } = props;
    this.setState({
      isAppFetching: true,
      initialData: null,
    });
    const component = routes[dialogType].component;
    const promise = component.fetch ? component.fetch(dialogProps, dispatch) : Promise.resolve();
    if (component.fetch) {
      pageLoading.start();
    }
    promise.then((data) => {
      if (component.fetch) {
        pageLoading.end();
      }
      const initialData = data ? data.payload : null;
      this.setState({
        isAppFetching: false,
        initialData,
        ready: true,
      });
    })
    .catch(console.err); // eslint-disable-line
  }

  render() {
    const { dialogProps, onClose, dispatch } = this.props;
    const { dialogType, initialData, loading, ready } = this.state;
    if (!dialogType || !ready) {
      return null;
    }
    return (<DialogComponent
      dialogType={dialogType}
      dialogProps={dialogProps}
      initialData={initialData}
      loading={loading}
      changeLoading={this.changeLoading}
      dispatch={dispatch}
      onClose={onClose}
    />);
  }

}

Container.propTypes = {
  /**
   * logged user
   */
  loggedUser: PropTypes.object,
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
  /**
   * dialog close function
   */
  onClose: PropTypes.func.isRequired,
  /**
   * dispatch function
   */
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const dialogState = state.router.location.state || {};
  return {
    loggedUser: state.auth.loggedUser,
    dialogType: dialogState.dialogType,
    dialogProps: dialogState.dialogProps,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(hideDialog()),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
