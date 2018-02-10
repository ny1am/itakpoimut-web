import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import hoistNonReactStatics from 'hoist-non-react-statics';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

import { hideDialog } from 'actions/dialog';
import { getDisplayName, getFirstErrorElement } from 'utils';

const scrollToError = (errors, holder) => {
  const element = getFirstErrorElement(errors, holder);
  element && scrollIntoViewIfNeeded(element);
};

//todo: refactor to enhanceForm
const enhanceDialog = (mapProps) => (Component) => {
  class EnhancedDialog extends React.Component {

    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        success: null,
        errors: {},
      };
    }

    componentWillMount() {
      const { dispatch } = this.context.store;
      this.mappedProps = mapProps(dispatch);
    }

    onSubmit(params) {
      const { changeLoading } = this.props;
      const { onSubmit, SuccessDialog } = this.mappedProps;
      //todo: context
      changeLoading(true);
      return onSubmit(params).then(data => {
        if (SuccessDialog) {
          this.setState({
            success: true,
          });
        } else {
          const { dispatch } = this.context.store;
          dispatch(hideDialog());
        }
        return data;
      }).catch(payload => {
        this.setState({
          errors: payload.errors
        });
        const holder = ReactDOM.findDOMNode(this);
        scrollToError(payload.errors, holder);
      }).finally(() => {
        changeLoading(false);
      });
    }

    render() {
      if(this.state.success) {
        const { SuccessDialog } = this.mappedProps;
        return (
          <SuccessDialog />
        );
      }
      return (<Component
        {...this.props}
        errors={this.state.errors}
        onSubmit={this.onSubmit}
      />);
    }

  }

  EnhancedDialog.contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }).isRequired,
  };

  EnhancedDialog.propTypes = {
    changeLoading: PropTypes.func.isRequired,
  };

  hoistNonReactStatics(EnhancedDialog, Component);

  EnhancedDialog.displayName = `EnhancedDialog(${getDisplayName(Component)})`;

  return EnhancedDialog;
};

export default enhanceDialog;
