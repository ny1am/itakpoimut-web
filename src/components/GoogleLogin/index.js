import React from 'react';
import PropTypes from 'prop-types';
import GoogleLoginComponent from 'react-google-login';

import { GOOGLE_CLIENT_ID } from 'consts';

import styles from './styles.scss';

class GoogleLogin extends React.Component {

  responseGoogle = ({ accessToken }) => {
    this.props.onChange(accessToken);
  }

  render() {
    return (
      <GoogleLoginComponent
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Вхід через Google+"
        className={styles.button}
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  }
}

GoogleLogin.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default GoogleLogin;
