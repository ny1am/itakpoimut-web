import React from 'react';
import PropTypes from 'prop-types';

import { SUCCESS_DIALOG } from 'constants/dialog';
import { showDialog, hideDialog } from 'actions/dialog';
import { getDisplayName } from 'utils';

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
      //todo: revise error handling
      return onSubmit(params, dispatch).then(data => {
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
      }).catch(payload => {
        this.setState({
          errors: payload.errors
        });
      }).finally(() => {
        changeLoading(false);
      });
    }

    render() {
      const { initialData, ...props } = this.props;
      return <Component {...props} {...initialData} errors={this.state.errors} onSubmit={this.onSubmit} />;
    }

  }

  onInit && (EnhancedDialog.fetch = onInit);

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
