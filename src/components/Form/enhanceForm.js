import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

import { getDisplayName, getFirstErrorElement } from 'utils';

import LoadingPortal from './LoadingPortal';

const scrollToError = (errors, holder) => {
  const element = getFirstErrorElement(errors, holder);
  element && scrollIntoViewIfNeeded(element);
};

const enhanceForm = (mapProps) => (Component) => {
  class EnhancedForm extends React.Component {

    state = {
      loading: false,
      success: null,
      errors: {},
    };

    componentWillMount() {
      const { dispatch } = this.context.store;
      this.mappedProps = mapProps(dispatch);
    }

    onSubmit = (...args) => {
      const { onSubmit } = this.mappedProps;
      this.setState({ loading: true });
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
          this.setState({ loading: false });
        });
    }

    render() {
      const { loading } = this.state;
      return (
        <React.Fragment>
          <Component
            {...this.props}
            {...this.state}
            onSubmit={this.onSubmit}
          />
          {loading && <LoadingPortal formRef={this} />}
        </React.Fragment>
      );
    }

  }

  EnhancedForm.contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }).isRequired,
  };

  hoistNonReactStatics(EnhancedForm, Component);

  EnhancedForm.displayName = `EnhancedForm(${getDisplayName(Component)})`;

  return EnhancedForm;
};

export default enhanceForm;
