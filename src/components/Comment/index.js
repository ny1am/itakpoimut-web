import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Avatar from 'components/Avatar';
import FormatDate from 'components/FormatDate';

import styles from './styles.scss';

const Comment = ({ comment, company }) => (
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
        {company && (
          <Link to={`/company/${company._id}`} className={styles.theme}>
            до теми {company.title}
          </Link>
        )}
      </div>
      <p className={styles.text}>{comment.text}</p>
    </div>
  </article>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    _user: PropTypes.shape({
      fname: PropTypes.string.isRequired,
      lname: PropTypes.string.isRequired,
    }).isRequired,
    created: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  company: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default Comment;
