import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

/**
 * Layout for dialogs
 */
class DialogLayout extends React.PureComponent {

  render() {
    const { children, onClose } = this.props;
    return (
      <div className={styles.shade}>
        <div id="dialog" className={styles.dialog}>
          {children}
          <button className={styles.close} onClick={onClose} />
          <div data-loading-portal />
        </div>
      </div>
    );
  }
}

DialogLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DialogLayout;
