import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class Layout extends React.Component {

  componentDidMount() {
    if (this.props.dialogShown) {
      document.body.style.overflowY = 'hidden';
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.dialogShown && nextProps.dialogShown) {
      //dialog has been shown
      document.body.style.overflowY = 'hidden';
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dialogShown && !this.props.dialogShown) {
      //dialog has been hidden
      document.body.style.overflowY = '';
    }
  }

  render() {
    const { children, dialogShown } = this.props;
    const style = dialogShown ? {
      overflowX: 'hidden',
      overflowY: 'scroll',
    } : {};
    return (
      <div className={styles.wrapper} style={style}>
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
