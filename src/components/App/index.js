import React from 'react';
import { Helmet } from 'react-helmet';

import Loading from 'components/Loading';
import ProgressBar from 'components/ProgressBar';
import Page from 'components/Page';
import Dialog from 'components/Dialog';

import ErrorBoundary from './ErrorBoundary';

/**
 * Main component. Contains ubiquitous components.
 */
class App extends React.Component {

  render() {
    const title = `"И так поймут" Kаталог ЗМІ та бізнесу`;
    return (
      <ErrorBoundary>
        <Helmet
          titleTemplate={`%s - ${title}`}
          defaultTitle={title}
        />
        <ProgressBar />
        <Dialog />
        <Page />
        <Loading />
      </ErrorBoundary>
    );
  }
}

export default App;
