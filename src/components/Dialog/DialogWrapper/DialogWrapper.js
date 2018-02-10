import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading';
import styles from './styles.scss';

/**
 * Wrapper for dialogs
 */
class DialogWrapper extends React.Component {

  render() {
    const { children, loading, visible, onClose } = this.props;
    const shadeClassName = `${styles.shade} ${visible?'':styles.hidden}`;
    return (
      <div className={shadeClassName}>
        <div id="dialog" className={styles.dialog}>
          {children}
          <button className={styles.close} onClick={onClose} />
          {loading && <Loading />}
        </div>
      </div>
    );
  }
}

DialogWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default DialogWrapper;
