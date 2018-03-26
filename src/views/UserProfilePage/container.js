import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { get, save } from 'actions/userProfile';
import { getFirstErrorElement, scrollIntoViewIfNeeded } from 'utils';

import UserProfilePageComponent from './UserProfilePage';

const scrollToError = (errors, holder) => {
  const element = getFirstErrorElement(errors, holder);
  element && scrollIntoViewIfNeeded(element);
};

class UserProfilePageContainer extends React.Component {
  static fetch(location, { dispatch }) {
    return [{
      prop: 'user',
      promise: dispatch(get()),
    }];
  }

  constructor(props) {
    super(props);
    this.state = {
      errors: undefined,
      successSave: false,
      user: props.initialData.user,
    };
  }

  onSubmit = (params) => {
    return this.props.onSubmit(params).then(data => {
      this.setState({
        successSave: true,
        errors: undefined,
        user: data.user,
      });
      window.scrollTo(0, 0);
      return data;
    }).catch(payload => {
      this.setState({
        successSave: false,
        errors: payload.errors,
      });
      const holder = ReactDOM.findDOMNode(this);
      scrollToError(payload.errors, holder);
    });
  }

  render() {
    return (<UserProfilePageComponent
      {...this.props}
      {...this.state}
      onSubmit={this.onSubmit}
    />);
  }
}

UserProfilePageContainer.propTypes = {
  initialData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (params) => dispatch(save(params)),
  dispatch
});

export default connect(null, mapDispatchToProps)(
  UserProfilePageContainer
);
