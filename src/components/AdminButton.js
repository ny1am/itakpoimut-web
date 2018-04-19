import React from 'react';
import PropTypes from 'prop-types';
import { CrossStorageClient } from 'cross-storage';

import { loadAuth } from 'store/storage';
import { ADMIN_URL, ADMIN_AUTH_KEY } from 'consts';

class AdminButton extends React.PureComponent {
  onClick() {
    const storage = new CrossStorageClient(ADMIN_URL);
    storage
      .onConnect()
      .then(() => storage.set(ADMIN_AUTH_KEY, JSON.stringify(loadAuth())))
      .then(() => window.open(ADMIN_URL, '_blank'));
  }

  render() {
    const className = this.props.className || '';
    return (
      <button className={className} onClick={this.onClick}>
        Адмінка
      </button>
    );
  }
}

AdminButton.propTypes = {
  className: PropTypes.string,
};

export default AdminButton;
