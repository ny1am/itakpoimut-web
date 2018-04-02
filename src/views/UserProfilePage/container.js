import React from 'react';
import PropTypes from 'prop-types';

import { get, save } from 'actions/userProfile';
import { enhanceForm } from 'components/Form';

import UserProfilePageComponent from './UserProfilePage';

class UserProfilePageContainer extends React.Component {
  static fetch(location, { dispatch }) {
    return [{
      prop: 'user',
      promise: dispatch(get()),
    }];
  }

  constructor(props) {
    super(props);
    const { user } = props.initialData;
    this.state = {
      user,
    };
  }

  onSubmit = (params) => {
    return this.props.onSubmit(params).then(data => {
      //todo: should not end up here on error
      if (data && data.user) {
        this.setState({
          user: data.user,
        });
        window.scrollTo(0, 0);
        return data;
      }
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

const mapProps = (dispatch) => ({
  onSubmit: (params) => dispatch(save(params)),
});

export default enhanceForm(mapProps)(
  UserProfilePageContainer
);
