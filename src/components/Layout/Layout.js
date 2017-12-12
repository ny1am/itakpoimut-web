import React from 'react';
import PropTypes from 'prop-types';

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageYOffset: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.dialogShown && nextProps.dialogShown) {
      //dialog has been shown
      this.setState({
        pageYOffset: window.pageYOffset
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dialogShown && !this.props.dialogShown) {
      //dialog has been hidden
      window.scrollTo(0, prevState.pageYOffset);
    }
  }

  render() {
    const { children, dialogShown } = this.props;
    const { pageYOffset } = this.state;
    const style = dialogShown ? {
      overflowX: 'hidden',
      overflowY: 'scroll',
      height: '100vh',
      marginTop: `${-pageYOffset}px`,
      paddingBottom: `${pageYOffset}px`
    } : {};
    return (
      <div style={style}>
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
