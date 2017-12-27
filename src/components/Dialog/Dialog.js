import React from 'react';
import PropTypes from 'prop-types';

import routes from './routes';
import Loading from './Loading';
import styles from './styles.scss';

/**
 * Wrapper for dialogs
 */
const Dialog = ({ dialogType, dialogProps, loading, onClose, ...rest }) => {
  if (!dialogType) {
    return null;
  }
  const SpecificDialog = routes[dialogType].component;
  return (
    <div className={styles.shade}>
      {/*id is used for scrolling*/}
      <div id="dialog" className={styles.dialog}>
        <SpecificDialog {...dialogProps} {...rest} />
        <button className={styles.close} onClick={onClose} />
        {loading && <Loading />}
      </div>
    </div>
  );
};

Dialog.propTypes = {
  /**
   * whether show loading screen or not
   */
  loading: PropTypes.bool,
  /**
   * dialog type
   */
  dialogType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  /**
   * Specific dialog props
   */
  dialogProps: PropTypes.object,
  /**
   * dialog close function
   */
  onClose: PropTypes.func.isRequired,
};

export default Dialog;
