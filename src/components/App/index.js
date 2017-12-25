import React from 'react';

import Loading from 'components/Loading';
import ProgressBar from 'components/ProgressBar';
import Routes from 'components/Routes';
import Layout from 'components/Layout';
import Dialog from 'components/Dialog';

import styles from './styles.scss';

/**
 * Main component. Used as a router entry point. Contains ubiquitous components.
 */
class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <ProgressBar />
        <Dialog />

        <Layout>
          <main className={styles.content}>
            <Routes />
          </main>
        </Layout>

        <Loading />
      </React.Fragment>
    );
  }
}

export default App;
