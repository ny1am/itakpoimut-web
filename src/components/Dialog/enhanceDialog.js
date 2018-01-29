import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { scrollIntoViewIfNeeded } from 'scroll-into-view-if-needed';

import { SUCCESS_DIALOG } from 'constants/dialog';
import { showDialog, hideDialog } from 'actions/dialog';
import { getDisplayName, getFirstErrorElement } from 'utils';

const scrollToError = (errors, holder) => {
  const element = getFirstErrorElement(errors, holder);
  element && scrollIntoViewIfNeeded(element);
};

const enhanceDialog = (mapProps) => (Component) => {
  class EnhancedDialog extends React.Component {

    static fetch(dialogProps, dispatch) {
      const { onInit } = mapProps(dispatch);
      return onInit && onInit(dialogProps);
    }

    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        errors: {},
      };
    }

    onSubmit(params) {
      const { dispatch } = this.context.store;
      const { changeLoading } = this.props;
      const { onSubmit, successText } = mapProps(dispatch);
      //todo: context
      changeLoading(true);
      return onSubmit(params).then(data => {
        if (successText) {
          dispatch(showDialog(SUCCESS_DIALOG, {
            title: 'Дякуємо!',
            body: successText
          }));
        } else {
          dispatch(hideDialog());
        }
        return data;
      }).catch(payload => {
        this.setState({
          errors: payload.errors
        });
        const holder = ReactDOM.findDOMNode(this);
        scrollToError(payload.errors, holder);
      }).finally(() => {
        changeLoading(false);
      });
    }

    render() {
      const { initialData, ...props } = this.props;
      return (<Component
        {...props}
        {...initialData}
        errors={this.state.errors}
        onSubmit={this.onSubmit}
      />);
    }

  }

  EnhancedDialog.contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }).isRequired,
  };

  EnhancedDialog.propTypes = {
    initialData: PropTypes.object,
    changeLoading: PropTypes.func.isRequired,
  };

  EnhancedDialog.displayName = `EnhancedDialog(${getDisplayName(Component)})`;

  return EnhancedDialog;
};

export default enhanceDialog;
