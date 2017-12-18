import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const SuccessDialog = ({ title, body }) => (
  <div className={`dialog_content ${styles.wrapper}`}>
    <h1 className="dialog__h1">
      {title}
    </h1>
    <div className={styles.icon} />
    <p dangerouslySetInnerHTML={{__html: body}} />
  </div>
);

SuccessDialog.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default SuccessDialog;
