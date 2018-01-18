import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { scrollIntoViewIfNeeded } from 'scroll-into-view-if-needed';

import Pagination from 'components/Pagination';
import Comment from 'components/Comment';

import CompanyCommentsForm from './CompanyCommentsForm';
import styles from './styles.scss';

class CompanyComments extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(companyId, text) {
    return this.props.onSubmit(companyId, text).then(data => {
      scrollIntoViewIfNeeded(ReactDOM.findDOMNode(this.refs.comments));
      return data;
    });
  }

  render() {
    const { comments, company } = this.props;
    return (
      <div className="container">
        <section className={styles.wrapper}>
          {/*id is used for scrolling*/}
          <header id="comments" ref="comments" className={styles.header}>
            <h1>
              Коментарі
            </h1>
            <span>
              {this.props.commentsCount} коментарів
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
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            generateUrl={
              (page) => `/company/${company._id}?currentPage=${page}#comments`
            }
          />
        </section>
        <CompanyCommentsForm company={company} onSubmit={this.onSubmit} />
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
