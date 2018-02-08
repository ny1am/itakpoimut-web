import React from 'react';
import { connect } from 'react-redux';

import { get } from 'actions/company';

import CompanyPageComponent from './CompanyPage';

class Container extends React.Component {
  static fetch(location, { dispatch, params, prevLocation }) {
    //todo: match change based checking
    if (!prevLocation || location.pathname !== prevLocation.pathname) {
      return [{
        promise: dispatch(get(params.id))
      }];
    }
    return null;
  }
  render() {
    return <CompanyPageComponent {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  company: state.company[ownProps.match.params.id],
});

export default connect(mapStateToProps)(Container);
