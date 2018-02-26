import React from 'react';
import PropTypes from 'prop-types';

import LandingSection from 'components/LandingSection';
import Comment from 'components/Comment';

import styles from './styles.scss';

class LastComments extends React.PureComponent {
  render() {
    const { comments } = this.props;
    if (!comments) {
      return null;
    }
    return (
      <LandingSection title="Останні коментарі">
        <ul className={styles.comments}>
          {comments.map(item => (
            <li key={item._id}>
              <Comment comment={item} company={item._company} />
            </li>
          ))}
        </ul>
      </LandingSection>
    );
  }
}

LastComments.propTypes = {
  comments: PropTypes.array,
};

export default LastComments;
