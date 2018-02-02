import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

import Pagination from 'components/Pagination';
import Comment from 'components/Comment';

import CompanyCommentsForm from './CompanyCommentsForm';
import styles from './styles.scss';

class CompanyComments extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.comments !== prevProps.comments) {
      const elementToScroll = ReactDOM.findDOMNode(this.refs.comments);
      scrollIntoViewIfNeeded(elementToScroll);
    }
  }

  render() {
    const {
      companyId, comments, commentsCount, currentPage, totalPages
    } = this.props;
    return (
      <div className="container">
        <section className={styles.wrapper}>
          <header ref="comments" className={styles.header}>
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            generateUrl={
              (page) => ({
                search: queryString.stringify({ currentPage: page }),
              })
            }
          />
        </section>
        <CompanyCommentsForm companyId={companyId} />
      </div>
    );
  }
}

CompanyComments.propTypes = {
  companyId: PropTypes.number.isRequired,
  commentsCount: PropTypes.number,
  comments: PropTypes.array,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};

CompanyComments.defaultProps = {
  commentsCount: 0,
  comments: [],
  currentPage: 1,
  totalPages: 0
};

export default CompanyComments;
