import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { getDisplayName } from 'utils';
import { enhanceForm } from 'components/Form';

//todo: move to another package
const enhanceView = (mapProps) => (Component) => {
  class EnhancedView extends React.Component {

    state = {
      SuccessView: null,
    }

    componentWillMount() {
      const { dispatch } = this.context.store;
      this.mappedProps = mapProps(dispatch);
    }

    componentWillReceiveProps(newProps) {
      if (newProps.success) {
        const { onSuccess } = this.mappedProps;
        onSuccess(this.showSuccessView);
      }
    }

    showSuccessView = (SuccessView) => {
      this.setState({ SuccessView });
    }

    render() {
      const { SuccessView } = this.state;
      if(SuccessView) {
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

  EnhancedView.contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }).isRequired,
  };

  EnhancedView.propTypes = {
    success: PropTypes.bool,
  };

  hoistNonReactStatics(EnhancedView, Component);

  EnhancedView.displayName = `EnhancedView(${getDisplayName(Component)})`;

  return enhanceForm(mapProps)(EnhancedView);
};

export default enhanceView;
