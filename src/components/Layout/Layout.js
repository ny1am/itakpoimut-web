import React from 'react';
import PropTypes from 'prop-types';

class Layout extends React.Component {
  render() {
    const { children, dialogShown } = this.props;
    const className = dialogShown ? 'layout-hidden' : '';
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

Layout.propTypes = {
  dialogShown: PropTypes.bool,
  children: PropTypes.node,
};

export default Layout;
