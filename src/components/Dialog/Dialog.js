import React from 'react';
import PropTypes from 'prop-types';

import routes from './routes';
import Loading from './Loading';

/**
 * Wrapper for dialogs
 */
const Dialog = ({ dialogType, dialogProps, initialData, loading, onClose }) => {
  if (!dialogType) {
    return null;
  }
  const SpecificDialog = routes[dialogType].component;
  return (
    <div className="shade">
      <div className="dialog">
        <SpecificDialog {...dialogProps} initialData={initialData} />
        <button className="dialog_close" onClick={onClose} />
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
   * dialog initial data
   */
  initialData: PropTypes.object,
  /**
   * dialog type
   */
  dialogType: PropTypes.string,
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
