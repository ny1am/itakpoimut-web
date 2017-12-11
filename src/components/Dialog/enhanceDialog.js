import React from 'react';
import PropTypes from 'prop-types';

import { SUCCESS_DIALOG } from 'constants/dialog';
import { showDialog, hideDialog } from 'actions/dialog';

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

const enhanceDialog = ({ onInit, onSubmit, successText }, Component) => {
  class EnhancedDialog extends React.Component {

    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        errors: {},
      };
    }

    onSubmit(params) {
      this.props.changeLoading(true);
      onSubmit(params, this.props.dispatch).then(data => {
        this.props.changeLoading(false);
        if (data.payload.result === 'success') {
          if (successText) {
            this.props.dispatch(showDialog(SUCCESS_DIALOG, {
              dialog_title: 'Дякуємо!',
              dialog_body: successText
            }));
          } else {
            this.props.dispatch(hideDialog());
          }
        } else if (data.payload.result === 'error') {
          this.setState({
            errors: data.payload.errors
          });
        }
      });
    }

    render() {
      const { initialData, ...passThroughProps } = this.props;
      return <Component {...passThroughProps} {...initialData} errors={this.state.errors} onSubmit={this.onSubmit} />;
    }

  }

  if (onInit) {
    EnhancedDialog.fetch = onInit;
  }

  EnhancedDialog.propTypes = {
    initialData: PropTypes.object,
    changeLoading: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  EnhancedDialog.displayName = `EnhancedDialog(${getDisplayName(Component)})`;

  return EnhancedDialog;
};

export default enhanceDialog;
