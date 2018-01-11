import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import routes from './routes';
import Loading from './Loading';
import styles from './styles.scss';

/**
 * Wrapper for dialogs
 */
class Dialog extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { props } = this;
    if (nextProps.dialogType && nextProps.dialogType !== props.dialogType) {
      ReactDOM.findDOMNode(this.refs.dialog).scrollTop = 0;
    }
  }

  render() {
    const { dialogType, dialogProps, loading, onClose, ...rest } = this.props;
    if (!dialogType) {
      return null;
    }
    const SpecificDialog = routes[dialogType].component;
    return (
      <div className={styles.shade}>
        <div ref="dialog" className={styles.dialog}>
          <SpecificDialog {...dialogProps} {...rest} />
          <button className={styles.close} onClick={onClose} />
          {loading && <Loading />}
        </div>
      </div>
    );
  }
}

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
