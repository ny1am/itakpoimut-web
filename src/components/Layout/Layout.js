import React from 'react';
import PropTypes from 'prop-types';

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageYOffset: 0,
    };
  }

  componentDidMount() {
    if (this.props.dialogShown) {
      document.body.style.overflowY = 'hidden';
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.dialogShown && nextProps.dialogShown) {
      //dialog has been shown
      document.body.style.overflowY = 'hidden';
      this.setState({
        pageYOffset: window.pageYOffset
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dialogShown && !this.props.dialogShown) {
      //dialog has been hidden
      document.body.style.overflowY = '';
      window.scrollTo(0, prevState.pageYOffset);
    }
  }

  render() {
    const { children, dialogShown, appReady } = this.props;
    const { pageYOffset } = this.state;
    const style = dialogShown ? {
      overflowX: 'hidden',
      overflowY: 'scroll',
      height: '100vh',
      marginTop: `${-pageYOffset}px`,
      paddingBottom: `${pageYOffset}px`
    } : {};
    const className = `content-wrapper ${appReady?'content-wrapper-shown':''}`;
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
}

Layout.propTypes = {
  dialogShown: PropTypes.bool,
  appReady: PropTypes.bool,
  children: PropTypes.node,
};

export default Layout;
