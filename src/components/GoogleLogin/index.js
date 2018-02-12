import React from 'react';
import PropTypes from 'prop-types';
import GoogleLoginComponent from 'react-google-login';

import styles from './styles.scss';

class GoogleLogin extends React.Component {

  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle({ accessToken }) {
    this.props.onChange(accessToken);
  }

  render() {
    return (<GoogleLoginComponent
      clientId="132410874020-p7hkqq8u1kfl5cfflv9fgsk3kiqqj2nf.apps.googleusercontent.com"
      buttonText="Вхід через Google+"
      className={styles.button}
      onSuccess={this.responseGoogle}
      onFailure={this.responseGoogle}
    />);
  }
}

GoogleLogin.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default GoogleLogin;
