import React from 'react';
import PropTypes from 'prop-types';

import { hideDialog } from 'actions/dialog';

const genericDialog = ({ fetchFunc, onSubmitFunc, onSubmitSuccess, Component }) => {
  class Container extends React.Component {

    static fetch(dialogProps, options) {
      if (fetchFunc) {
        return fetchFunc(dialogProps, options);
      } else {
        return Promise.resolve();
      }
    }

    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        errors: {},
      };
    }

    onSubmit(params) {
      this.props.changeLoading(true);
      onSubmitFunc(params, this.props.dispatch).then(data => {
        this.props.changeLoading(false);
        if (data.payload.result === 'success') {
          if (onSubmitSuccess) {
            onSubmitSuccess(this.props.dispatch);
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
      const { initialData, ...rest } = this.props;
      return <Component {...rest} {...initialData} errors={this.state.errors} onSubmit={this.onSubmit} />;
    }

  }

  Container.propTypes = {
    initialData: PropTypes.object,
    changeLoading: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  return Container;
};

export default genericDialog;
