import React from 'react';
import { Helmet } from 'react-helmet';

import Loading from 'components/Loading';
import ProgressBar from 'components/ProgressBar';
import Page from 'components/Page';
import Dialog from 'components/Dialog';

/**
 * Main component. Used as a router entry point. Contains ubiquitous components.
 */
class App extends React.Component {

  render() {
    const title = `"И так поймут" Kаталог ЗМІ та бізнесу`;
    return (
      <React.Fragment>
        <Helmet
          titleTemplate={`%s - ${title}`}
          defaultTitle={title}
        />
        <ProgressBar />
        <Dialog />
        <Page />
        <Loading />
      </React.Fragment>
    );
  }
}

export default App;
