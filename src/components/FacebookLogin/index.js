import React from 'react';
import PropTypes from 'prop-types';
import FacebookLoginComponent from 'react-facebook-login';

class FacebookLogin extends React.Component {

  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook({ accessToken }) {
    this.props.onChange(accessToken);
  }

  render() {
    return (<FacebookLoginComponent
      appId="308939522798119"
      autoLoad={false}
      callback={this.responseFacebook}
    />);
  }
}

FacebookLogin.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FacebookLogin;
