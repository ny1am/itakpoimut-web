import React from 'react';
import PropTypes from 'prop-types';
import { scrollIntoViewIfNeeded } from 'scroll-into-view-if-needed';

import Pagination from 'components/Pagination';
import Comment from 'components/Comment';

import CompanyCommentsForm from './CompanyCommentsForm';
import styles from './styles.scss';

class CompanyComments extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.comments !== prevProps.comments) {
      //todo: maybe use refs
      const elementToScroll = document.getElementById('comments');
      scrollIntoViewIfNeeded(elementToScroll);
    }
  }

  render() {
    const {
      company, comments, commentsCount, currentPage, totalPages, onSubmit
    } = this.props;
    return (
      <div className="container">
        <section className={styles.wrapper}>
          <header id="comments" className={styles.header}>
            <h1>
              Коментарі
            </h1>
            <span>
              {commentsCount} коментарів
            </span>
          </header>
          {comments.length > 0 &&
            <ul className={styles.list}>
              {comments.map((item, index) => (
                <li key={index}>
                  <Comment comment={item} />
                </li>
              ))}
            </ul>
          }
          {/*todo: revise hardcoded url; there is no need in company path here*/}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            generateUrl={
              (page) => `/company/${company._id}?currentPage=${page}`
            }
          />
        </section>
        <CompanyCommentsForm company={company} onSubmit={onSubmit} />
      </div>
    );
  }
}

CompanyComments.propTypes = {
  company: PropTypes.shape({
    _id: PropTypes.number.isRequired,
  }).isRequired,
  commentsCount: PropTypes.number,
  comments: PropTypes.array,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
};

CompanyComments.defaultProps = {
  commentsCount: 0,
  comments: [],
  currentPage: 1,
  totalPages: 0
};

export default CompanyComments;
