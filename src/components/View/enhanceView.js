import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { getDisplayName } from 'utils';
import { wrapWithConsumer } from 'utils/enhancers';
import { enhanceForm } from 'components/Form';

import ViewModeContext from './ViewModeContext';

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
      const { success, viewMode } = newProps;
      if (success) {
        const { onSuccess } = this.mappedProps;
        onSuccess({
          showSuccessView: this.showSuccessView,
          viewMode
        });
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
    viewMode: PropTypes.oneOf(['page', 'dialog', 'dialogInPage']).isRequired,
    success: PropTypes.bool,
  };

  const EnhancedViewWithContext = wrapWithConsumer({
    Context: ViewModeContext,
    Component: EnhancedView,
    propName: 'viewMode'
  });

  hoistNonReactStatics(EnhancedViewWithContext, Component);

  EnhancedViewWithContext.displayName =
    `EnhancedView(${getDisplayName(Component)})`;

  return enhanceForm(mapProps)(EnhancedViewWithContext);
};

export default enhanceView;
