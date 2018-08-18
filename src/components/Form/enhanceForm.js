import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

import { getDisplayName, getFirstErrorElement, processErrors } from 'utils';

import Loading from './Loading';

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
      const { dispatch } = this.props;
      this.mappedProps = mapProps(dispatch);
    }

    onSubmit = (...args) => {
      const { onSubmit } = this.mappedProps;
      this.setState({ loading: true });
      return onSubmit(...args)
        .then((data) => {
          this.setState({
            success: true,
            errors: {},
            loading: false,
          });
          return data;
        })
        .catch((payload) => {
          const errors = processErrors(payload.errors);
          this.setState({
            success: false,
            errors,
            loading: false,
          });
          if (errors) {
            const holder = ReactDOM.findDOMNode(this);
            scrollToError(errors, holder);
          }
        });
    };

    render() {
      const { loading } = this.state;
      return (
        <React.Fragment>
          <Component {...this.props} {...this.state} onSubmit={this.onSubmit} />
          {loading && <Loading />}
        </React.Fragment>
      );
    }
  }

  EnhancedForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  hoistNonReactStatics(EnhancedForm, Component);

  EnhancedForm.displayName = `EnhancedForm(${getDisplayName(Component)})`;

  return connect()(EnhancedForm);
};

export default enhanceForm;
