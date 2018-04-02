import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

import { getDisplayName, getFirstErrorElement } from 'utils';

const scrollToError = (errors, holder) => {
  const element = getFirstErrorElement(errors, holder);
  element && scrollIntoViewIfNeeded(element);
};

const enhanceForm = (mapProps) => (Component) => {
  class EnhancedForm extends React.Component {

    state = {
      success: null,
      errors: {},
    };

    componentWillMount() {
      const { dispatch } = this.context.store;
      this.mappedProps = mapProps(dispatch);
    }

    onSubmit = (...args) => {
      const { changeLoading } = this.context;
      const { onSubmit } = this.mappedProps;
      changeLoading(true);
      return onSubmit(...args)
        .then(data => {
          this.setState({
            success: true,
            errors: {},
          });
          return data;
        })
        .catch(payload => {
          this.setState({
            success: false,
            errors: payload.errors
          });
          const holder = ReactDOM.findDOMNode(this);
          scrollToError(payload.errors, holder);
        })
        .finally(() => {
          changeLoading(false);
        });
    }

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          onSubmit={this.onSubmit}
        />
      );
    }

  }

  EnhancedForm.contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }).isRequired,
    changeLoading: PropTypes.func.isRequired,
  };

  hoistNonReactStatics(EnhancedForm, Component);

  EnhancedForm.displayName = `EnhancedForm(${getDisplayName(Component)})`;

  return EnhancedForm;
};

export default enhanceForm;
