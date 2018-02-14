import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import styles from './styles.scss';

class ResetPasswordPageWrapper extends React.PureComponent {

  render() {
    return (
      <div className="pattern-content">
        <Helmet>
          <title>Змінити пароль</title>
        </Helmet>
        <div className="container">
          <div className={styles.wrapper}>
            <div className={styles.content}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResetPasswordPageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ResetPasswordPageWrapper;
