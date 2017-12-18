import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class SuccessDialog extends React.Component {
  render() {
    return (
      <div className={`dialog_content ${styles.wrapper}`}>
        <h1 className="dialog__h1">
          {this.props.dialog_title}
        </h1>
        <div className={styles.icon} />
        <p dangerouslySetInnerHTML={{__html: this.props.dialog_body}} />
      </div>
    );
  }
}

SuccessDialog.propTypes = {
  dialog_title: PropTypes.string.isRequired,
  dialog_body: PropTypes.string.isRequired,
};

export default SuccessDialog;
