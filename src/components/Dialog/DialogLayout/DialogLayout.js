import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import styles from './styles.scss';

/**
 * Layout for dialogs
 */
class DialogLayout extends React.PureComponent {

  render() {
    const { children, loading, onClose } = this.props;
    return (
      <div className={styles.shade}>
        <div id="dialog" className={styles.dialog}>
          {children}
          <button className={styles.close} onClick={onClose} />
          {loading && <Loading />}
        </div>
      </div>
    );
  }
}

DialogLayout.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DialogLayout;
