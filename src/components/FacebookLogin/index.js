import React from 'react';
import PropTypes from 'prop-types';
import FacebookLoginComponent from 'react-facebook-login/dist/facebook-login-render-props';

import styles from './styles.scss';

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
      callback={this.responseFacebook}
      render={({ onClick, isProcessing, isDisabled, isSdkLoaded }) => {
        const disabled = isProcessing || !isSdkLoaded || isDisabled;
        return (
          <button
            className={styles.button}
            onClick={onClick}
            disabled={disabled}
          >
            Вхід через Facebook
          </button>
        );
      }}
    />);
  }
}

FacebookLogin.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FacebookLogin;
