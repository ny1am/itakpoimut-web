import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import disableScroll from 'disable-scroll';

import Header from 'components/Header';
import Menu from 'components/Menu';
import Footer from 'components/Footer';

import styles from './styles.scss';

class Layout extends React.Component {

  componentDidMount() {
    this.scrollHandler();
  }

  componentDidUpdate() {
    this.scrollHandler();
  }

  scrollHandler() {
    const { overflowShown } = this.props;
    const element = ReactDOM.findDOMNode(this.refs.layout);
    if (overflowShown) {
      disableScroll.on(element, {
        disableWheel: false,
      });
      document.body.style.overflowY = 'hidden';
    } else {
      disableScroll.off(element);
      document.body.style.overflowY = '';
    }
  }

  render() {
    const { overflowShown, children } = this.props;
    const className = `${styles.wrapper} ${overflowShown?styles.fixed:''}`;
    return (
      <div ref="layout" className={className}>
        <Header />
        <Menu />
        {children}
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  overflowShown: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
