import React from 'react';
import PropTypes from 'prop-types';

import FacebookLogin from 'components/FacebookLogin';
import GoogleLogin from 'components/GoogleLogin';

import styles from './styles.scss';

class SocialLoginSection extends React.PureComponent {
  render() {
    const { handleFacebookSubmit, handleGoogleSubmit } = this.props;
    return (
      <React.Fragment>
        <div className={styles.socials}>
          <FacebookLogin onChange={handleFacebookSubmit}/>
          <GoogleLogin onChange={handleGoogleSubmit}/>
        </div>
        <div className={styles.separator}>або</div>
      </React.Fragment>
    );
  }
}

SocialLoginSection.propTypes = {
  handleFacebookSubmit: PropTypes.func.isRequired,
  handleGoogleSubmit: PropTypes.func.isRequired,
};

export default SocialLoginSection;
