import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

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
      if (!data.payload.error) {
        ReactDOM.findDOMNode(this.refs.comments).scrollIntoView();
      }
      return data;
    });
  }

  render() {
    const { comments, company } = this.props;
    return (
      <div className="container">
        <section className={styles.wrapper}>
          <header className={styles.header}>
            <h1>
              Коментарі
            </h1>
            <span>
              {this.props.commentsCount} коментарів
            </span>
          </header>
          {comments.length > 0 &&
            <ul ref="comments" className={styles.list}>
              {comments.map((item, index) => (
                <li key={index}>
                  <Comment comment={item} />
                </li>
              ))}
            </ul>
          }
          <Pagination currentPage={this.props.currentPage} totalPages={this.props.totalPages}>
            <Link to={"/company/"+this.props.company._id+"?currentPage={{page}}"} />
          </Pagination>
        </section>
        <CompanyCommentsForm company={company} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

CompanyComments.propTypes = {
  company: PropTypes.object,
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