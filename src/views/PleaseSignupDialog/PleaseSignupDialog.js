import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class PleaseSignupDialog extends React.Component {
  render() {
    return (
      <div className={`dialog_content ${styles.wrapper}`}>
        <div className="forbidden-figure" />
        <h1 className="smallHeader">
          Ця дія доступна тільки зареєстрованим користувачам
        </h1>
        <div className="actions">
          <button className="dialog__button" onClick={this.props.onLogin}>
            Ввійти
          </button>
          <br/>
          <button className="regularLink" onClick={this.props.onSignup}>
            Реєстрація
          </button>
        </div>
      </div>
    );
  }
}

PleaseSignupDialog.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired,
};

export default PleaseSignupDialog;
