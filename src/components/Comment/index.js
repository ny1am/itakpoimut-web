import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Avatar from 'components/Avatar';
import FormatDate from 'components/FormatDate';

import styles from './styles.scss';

class Comment extends React.Component {
  render() {
    const comment = this.props.comment;
    const company = this.props.company;
    return (
      <article className={styles.wrapper}>
        <div className={styles.logo}>
          <Avatar user={comment._user} size={90} />
        </div>
        <div className={styles.body}>
          <div className={styles.meta}>
            <span className={styles.author}>
              {comment._user.fname} {comment._user.lname}
            </span>
            <span className={styles.time}>
              <FormatDate dateString={comment.created} />
            </span>
            {company &&
              <Link to={`/company/${company._id}`} className={styles.theme}>
                до теми {company.title}
              </Link>
            }
          </div>
          <p className={styles.text}>
            {comment.text}
          </p>
        </div>
      </article>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  company: PropTypes.object
};

export default Comment;
