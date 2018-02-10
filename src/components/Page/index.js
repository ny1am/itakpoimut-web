import React from 'react';

import Routes from 'components/Routes';
import Layout from 'components/Layout';

import styles from './styles.scss';

class Page extends React.Component {
  render() {
    return (
      <Layout>
        <main className={styles.content}>
          <Routes />
        </main>
      </Layout>
    );
  }
}

export default Page;
