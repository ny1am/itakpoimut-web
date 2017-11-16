import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { avatar, formatDate } from 'utils';

class Comment extends React.Component {
  render() {
    const comment = this.props.comment;
    const company = this.props.company;
    return (
      <article className="comment">
        <div className="comment-image">
          <img src={avatar(comment._user.picture_url, 90)} />
        </div>
        <div className="comment-body">
          <div className="comment-meta">
            <span className="comment-author">
              {comment._user.fname} {comment._user.lname}
            </span>
            <span className="comment-time">
              {formatDate(comment.created)}
            </span>
            {company &&
              <Link to={`/company/${company._id}`} className="comment-theme">
                до теми {company.title}
              </Link>
            }
          </div>
          <p className="comment-text">
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
