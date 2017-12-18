import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { LOGIN_DIALOG } from 'constants/dialog';
import DialogLink from 'components/DialogLink';
import Pagination from 'components/Pagination';
import Comment from 'components/Comment';
import Avatar from 'components/Avatar';

import styles from './styles.scss';

class CompanyComments extends React.Component {

  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      text: ''
    };
  }

  handleTextChange(e) {
    const text = e.target.value;
    this.setState({ text });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.company._id, this.state.text).then(data => {
      if (data.payload.company) {
        this.setState({ text: '' });
        ReactDOM.findDOMNode(this.refs.comments).scrollIntoView();
      }
    });
  }

  renderCommentsForm() {
    if (this.props.loggedUser) {
      return (
        <form action="/addComment" className={styles.form} method="post" onSubmit={this.handleSubmit}>
          <input type="hidden" name="_company" value={this.props.company._id} />
          <h2>
            Додати коментар
          </h2>
          <div className={styles.row}>
            <div className={styles.rowImage}>
              <Avatar user={this.props.loggedUser} />
            </div>
            <textarea
              name="text"
              value={this.state.text}
              onChange={this.handleTextChange}
              placeholder="Введіть ваш коментар"
              maxLength="500"
            />
          </div>
          <div className="right-content">
            <button className="dialog__button" type="submit">Додати коментар</button>
          </div>
        </form>
      );
    } else {
      return (
        <div className={styles.notLoggedIn}>
          Для того, щоб залишити коментар, вам необхідно <DialogLink dialogType={LOGIN_DIALOG}>ввійти</DialogLink>
        </div>
      );
    }
  }
  render() {
    const { comments } = this.props;
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
        {this.renderCommentsForm()}
      </div>
    );
  }
}

CompanyComments.propTypes = {
  loggedUser: PropTypes.object,
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
