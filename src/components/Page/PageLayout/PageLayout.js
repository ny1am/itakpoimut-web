import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import disableScroll from 'disable-scroll';
import cn from 'classnames';

import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

import styles from './styles.scss';

class PageLayout extends React.PureComponent {

  constructor(props) {
    super(props);
    this.layout = React.createRef();
  }

  componentDidMount() {
    this.scrollHandler();
  }

  componentDidUpdate() {
    this.scrollHandler();
  }

  scrollHandler() {
    const { overflowShown } = this.props;
    const element = ReactDOM.findDOMNode(this.layout.current);
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
    return (
      <div ref={this.layout} className={cn(
        styles.wrapper,
        { [styles.fixed]: overflowShown }
      )}>
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
