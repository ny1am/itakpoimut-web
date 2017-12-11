import React from 'react';
import PropTypes from 'prop-types';
import Progress from 'react-progress-2';

import Loading from 'components/Loading';
import Routes from 'components/Routes';
import Dialog from 'components/Dialog';
import Header from 'components/Header';
import Menu from 'components/Menu';
import Footer from 'components/Footer';

/**
 * Main component. Used as a router entry point. Contains ubiquitous components.
 */
class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Progress.Component />
        <Loading />
        <Dialog />

        <Header />
        <Menu />
        <main className="site-content">
          <Routes store={this.props.store} />
        </main>
        <Footer />

      </React.Fragment>
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
