import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hideDialog } from 'actions/dialog';
import { PLEASE_SIGNUP_DIALOG } from 'constants/dialog';
import { wrapPromise as wrapPromiseWithProgress } from 'components/ProgressBar';
import { keyValueToObjectReducer } from 'utils';

import DialogComponent from './Dialog';
import routes from './routes';

const emptyFetchResult = {
  promise: Promise.resolve()
};

const extractInitialData = (names, values) => {
  const initialData = values
    .map((value, index) => ({
      key: names[index],
      value
    }))
    .filter(item => item.key)
    .reduce(keyValueToObjectReducer, {});
  return initialData;
};

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.changeLoading = this.changeLoading.bind(this);
    this.state = {
      dialogType: props.dialogType,
      isAppFetching: false,
      initialData: null,
      loading: false,
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
    const { dialogProps } = props;
    const { dispatch } = this.context.store;
    this.setState({
      isAppFetching: true,
      initialData: null,
    });
    const { fetch } = routes[dialogType].component;
    const fetchResult =
      (fetch && fetch(dialogProps, dispatch)) || [emptyFetchResult];
    const promise = Promise.all(fetchResult.map(item => item.promise));
    wrapPromiseWithProgress(promise).then(values => {
      const fetchNames = fetchResult.map(item => item.prop);
      const initialData = extractInitialData(fetchNames, values);
      this.setState({
        initialData,
      });
      return values;
    }).catch(error => {
      this.setState({
        appFetchingError: error
      });
    }).finally(() => {
      this.setState({
        isAppFetching: false,
      });
    });
  }

  render() {
    const { dialogProps, onClose } = this.props;
    const { dialogType, initialData, loading } = this.state;
    if (!dialogType) {
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
