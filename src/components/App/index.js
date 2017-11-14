import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

import Routes from '../../routes';

/**
 * Main component. Used as a router entry point. Contains ubiquitous components.
 */
class App extends React.Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Routes store={this.props.store} />
        </div>
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
