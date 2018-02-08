import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hideDialog } from 'actions/dialog';
import { PLEASE_SIGNUP_DIALOG } from 'consts/dialog';
import { wrapPromise as wrapPromiseWithProgress } from 'components/ProgressBar';
import { extractInitialData } from 'utils';

import DialogComponent from './Dialog';
import findRoute from './utils/findRoute';
import extractFetchConfig from './utils/extractFetchConfig';

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
    const location = {
      pathname: nextDialogType,
      params: this.props.dialogProps
    };
    this.fetchInitialData(location);
  }

  componentWillReceiveProps (nextProps) {
    const nextDialogType = this.guardDialogType(nextProps.dialogType);
    if (this.state.dialogType === nextDialogType || !nextDialogType) {
     return;
    }
    const location = {
      pathname: nextDialogType,
      params: nextProps.dialogProps,
    };
    this.fetchInitialData(location);
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
      const route = findRoute(nextDialogType);
      if (route.secure && !this.props.loggedUser) {
        nextDialogType = PLEASE_SIGNUP_DIALOG;
      }
    }
    this.setState({ dialogType: nextDialogType });
    return nextDialogType;
  }

  getFetchConfig(location) {
    const { dispatch } = this.context.store;
    const fetchResult = extractFetchConfig(location, { dispatch });
    return {
      fetchKeys: fetchResult.map(item => item.prop),
      fetchPromises: fetchResult.map(item => item.promise)
    };
  }

  fetchInitialData (location) {
    this.setState({ isAppFetching: true });
    const { fetchKeys, fetchPromises } = this.getFetchConfig(location);

    const promise = wrapPromiseWithProgress(Promise.all(fetchPromises))
    .then(values => extractInitialData(fetchKeys, values))
    .then(initialData => {
      this.setState({ initialData });
      return initialData;
    })
    .finally(() => {
      this.setState({
        isAppFetching: false,
        ready: true
      });
    });
    return promise;
  }

  render() {
    const { dialogProps, onClose } = this.props;
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
      onClose={onClose}
    />);
  }

}

Container.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

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
  ]).isRequired,
  /**
   * Specific dialog props
   */
  dialogProps: PropTypes.object,
  /**
   * dialog close function
   */
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const dialogState = state.router.location.state || {};
  return {
    loggedUser: state.auth.loggedUser,
    dialogType: dialogState.dialogType || false,
    dialogProps: dialogState.dialogProps,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(hideDialog()),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
