import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { get } from 'actions/createCompany';

import CreateCompanyDialogComponent from './CreateCompanyDialog';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
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

  render() {
    if (!this.state.ready) {
      return null;
    }
    return <CreateCompanyDialogComponent {...this.props} {...this.state.data} onSubmit={this.onSubmit} />;
  }
}

Container.propTypes = {
  onInit: PropTypes.func,
  dispatch: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onInit: () => dispatch(get()),
  dispatch
});

export default connect(
  null, mapDispatchToProps
)(Container);
