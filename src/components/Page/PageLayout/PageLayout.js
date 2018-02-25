import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import disableScroll from 'disable-scroll';

import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

import styles from './styles.scss';

class PageLayout extends React.PureComponent {

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
        <main className={styles.content}>
          {children}
        </main>
        <Footer />
      </div>
    );
  }
}

PageLayout.propTypes = {
  overflowShown: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageLayout;
