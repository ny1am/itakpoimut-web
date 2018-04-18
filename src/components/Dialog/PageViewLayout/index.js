import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

class PageViewLayout extends React.PureComponent {
  render() {
    return (
      <div className={cn('pattern-content', styles.wrapper)}>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

PageViewLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageViewLayout;
