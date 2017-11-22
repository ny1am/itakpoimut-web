import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SUCCESS_DIALOG } from 'constants/dialog';
import { get, save } from 'actions/createCompany';
import { showDialog } from 'actions/dialog';

import CreateCompanyDialogComponent from './CreateCompanyDialog';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      ready: false,
      errors: {},
    };
  }

  componentWillMount () {
    this.fetchData();
  }

  fetchData() {
    this.props.onInit().then(data => {
      this.setState({
        ready: true,
        data: data.payload,
      });
    });
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
    if (!this.state.ready) {
      return null;
    }
    return <CreateCompanyDialogComponent {...this.props} {...this.state.data} errors={this.state.errors} onSubmit={this.onSubmit} />;
  }
}

Container.propTypes = {
  onInit: PropTypes.func,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onInit: () => dispatch(get()),
  onSubmit: (data) => dispatch(save(data)),
  dispatch
});

export default connect(
  null, mapDispatchToProps
)(Container);
