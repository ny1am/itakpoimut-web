import React from 'react';
import PropTypes from 'prop-types';

import DesktopHeader from 'components/DesktopHeader';
import MobileHeader from 'components/MobileHeader';
import MainMenu from 'components/MainMenu';
import MobileMenu from 'components/MobileMenu';
import Footer from 'components/Footer';

import Routes from '../../routes';

/**
 * Main component. Used as a router entry point. Contains ubiquitous components.
 */
class App extends React.Component {

  render() {
    return (
      <div>
        <DesktopHeader />
        <MobileHeader />
        <MainMenu />
        <MobileMenu />
        <main className="site-content">
          <Routes store={this.props.store} />
        </main>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  /**
   * store object (needed to pass to Routes)
   */
  store: PropTypes.object,
};

export default App;
