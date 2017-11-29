import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SUCCESS_DIALOG } from 'constants/dialog';
import { get, save } from 'actions/createCompany';
import { showDialog } from 'actions/dialog';

import CreateCompanyDialogComponent from './CreateCompanyDialog';

class Container extends React.Component {

  static fetch(dialogProps, { dispatch }) {
    return dispatch(get());
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      errors: {},
    };
  }

  onSubmit(params) {
    this.props.onSubmit(params).then(data => {
      if (data.payload.result === 'success') {
        this.props.dispatch(showDialog(SUCCESS_DIALOG, {
          dialog_title: 'Дякуємо!',
          dialog_body: 'Запит на створення компанії надіслано. Адміністратор розгляне його найближчим часом.',
        }));
      } else if (data.payload.result === 'error') {
        this.setState({
          errors: data.payload.errors
        });
      }
    });
  }

  render() {
    const { initialData, ...rest } = this.props;
    return <CreateCompanyDialogComponent {...rest} {...initialData} errors={this.state.errors} onSubmit={this.onSubmit} />;
  }
}

Container.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data) => dispatch(save(data)),
  dispatch
});

export default connect(
  null, mapDispatchToProps
)(Container);