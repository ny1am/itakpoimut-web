import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hideDialog } from 'actions/dialog';
import { PLEASE_SIGNUP_DIALOG } from 'constants/dialog';

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
    };
  }

  componentWillReceiveProps (nextProps) {
    const { dialogType } = this.state;
    let nextDialogType = nextProps.dialogType;
    if (nextDialogType) {
      const route = routes[nextDialogType];
      if (route.secure && !this.props.loggedUser) {
        nextDialogType = PLEASE_SIGNUP_DIALOG;
      }
    }
    this.setState({
      dialogType: nextDialogType,
    });
    if (dialogType === nextDialogType || !nextDialogType) {
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

  fetchInitialData (props, dialogType) {
    const { dispatch, dialogProps } = props;
    this.setState({
      isAppFetching: true,
      initialData: null,
    });
    const component = routes[dialogType].component;
    const promise = component.fetch ? component.fetch(dialogProps, { dispatch }) : Promise.resolve();
    promise.then((data) => {
      const initialData = data ? data.payload : null;
      this.setState({
        isAppFetching: false,
        initialData,
      });
    })
    .catch(console.err); // eslint-disable-line
  }

  render() {
    const { dialogProps, onClose, dispatch } = this.props;
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
