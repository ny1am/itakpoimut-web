import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

import Comment from 'components/Comment';

import CompanyCommentsForm from './CompanyCommentsForm';
import styles from './styles.scss';

class CompanyComments extends React.PureComponent {
  render() {
    const {
      companyId,
      comments,
      commentsCount,
      currentPage,
      totalPages,
      onLoadComments,
    } = this.props;
    return (
      <div className="container">
        <section className={styles.wrapper}>
          <header ref={this.comments} className={styles.header}>
            <h1>Коментарі</h1>
            <span>{commentsCount} коментарів</span>
          </header>

          <CompanyCommentsForm companyId={companyId} />

          {comments.length > 0 && (
            <InfiniteScroll
              pageStart={currentPage}
              loadMore={(page) => onLoadComments(companyId, page)}
              hasMore={totalPages && currentPage !== totalPages}
              loader={<div key={0}>Завантаження...</div>}
            >
              <ul className={styles.list}>
                {comments.map((item) => (
                  <li key={item._id}>
                    <Comment comment={item} />
                  </li>
                ))}
              </ul>
            </InfiniteScroll>
          )}
        </section>
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
  onLoadComments: PropTypes.func.isRequired,
};

export default CompanyComments;
