import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import { TextBlock, RoundShape } from 'react-placeholder/lib/placeholders';

import 'react-placeholder/lib/reactPlaceholder.css';

import styles from './styles.scss';

class CommentLoading extends React.PureComponent {
  render() {
    return (
      <ReactPlaceholder
        ready={false}
        showLoadingAnimation={true}
        customPlaceholder={
          <div className={styles.wrapper}>
            <RoundShape
              color="#ccc"
              className={styles.avatar}
              style={{ width: 90, height: 90 }}
            />
            <TextBlock color="#ccc" className={styles.block} rows={3} />
          </div>
        }
      >
        <React.Fragment />
      </ReactPlaceholder>
    );
  }
}

export default CommentLoading;
