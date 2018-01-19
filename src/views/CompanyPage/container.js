import React from 'react';
import { connect } from 'react-redux';

import { get } from 'actions/company';

import CompanyPageComponent from './CompanyPage';

class Container extends React.Component {
  static fetch({ params }, location, { dispatch, prevLocation }) {
    //todo: match change based checking
    if (!prevLocation || location.pathname !== prevLocation.pathname) {
      return dispatch(get(params.id));
    }
    return null;
  }
  render() {
    return <CompanyPageComponent {...this.props} />;
  }
}

//todo: revise, get from initialData
const mapStateToProps = (state) => ({
  company: state.company.company,
});

export default connect(mapStateToProps)(Container);
