import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { hideDialog } from 'actions/dialog';
import { getDisplayName } from 'utils';
import { enhanceForm } from 'components/Form';

const enhanceDialog = (mapProps) => (Component) => {
  class EnhancedDialog extends React.Component {

    componentWillMount() {
      const { dispatch } = this.context.store;
      this.mappedProps = mapProps(dispatch);
    }

    componentWillReceiveProps(newProps) {
      const { SuccessView } = this.mappedProps;
      if (newProps.success && !SuccessView) {
        const { dispatch } = this.context.store;
        dispatch(hideDialog());
      }
    }

    render() {
      const { SuccessView } = this.mappedProps;
      if(this.props.success && SuccessView) {
        return (
          <SuccessView />
        );
      }
      return (
        <Component
          {...this.props}
        />
      );
    }

  }

  EnhancedDialog.contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }).isRequired,
  };

  EnhancedDialog.propTypes = {
    success: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
  };

  hoistNonReactStatics(EnhancedDialog, Component);

  EnhancedDialog.displayName = `EnhancedDialog(${getDisplayName(Component)})`;

  return enhanceForm(mapProps)(EnhancedDialog);
};

export default enhanceDialog;
