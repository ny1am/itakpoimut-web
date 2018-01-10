import React from 'react';
import PropTypes from 'prop-types';

import { SUCCESS_DIALOG } from 'constants/dialog';
import { showDialog, hideDialog } from 'actions/dialog';

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

const enhanceDialog = ({ onInit, onSubmit, successText }) => (Component) => {
  class EnhancedDialog extends React.Component {

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
      changeLoading(true);
      onSubmit(params, dispatch).then(data => {
        changeLoading(false);
        if (data.payload.result === 'success') {
          if (successText) {
            dispatch(showDialog(SUCCESS_DIALOG, {
              title: 'Дякуємо!',
              body: successText
            }));
          } else {
            dispatch(hideDialog());
          }
        } else if (data.payload.result === 'error') {
          this.setState({
            errors: data.payload.errors
          });
        }
      });
    }

    render() {
      const { initialData, ...props } = this.props;
      return <Component {...props} {...initialData} errors={this.state.errors} onSubmit={this.onSubmit} />;
    }

  }

  if (onInit) {
    EnhancedDialog.fetch = onInit;
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
