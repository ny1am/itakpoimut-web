import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loading screen
 */
const Loading = ({ appReady }) => {
  const className = `loading-wrapper ${appReady?'loading-hidden':''}`;
  return (
    <div className={className}>
      <p className="loadingText">
        Почекайте...
      </p>
    </div>
  );
};

Loading.propTypes = {
  appReady: PropTypes.bool,
};

export default Loading;
