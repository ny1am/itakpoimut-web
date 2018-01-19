import React from 'react';
import PropTypes from 'prop-types';

import { LOGIN_DIALOG } from 'constants/dialog';
import DialogLink from 'components/DialogLink';
import Avatar from 'components/Avatar';
import { wrapPromise as wrapPromiseWithProgress } from 'components/ProgressBar';

import styles from './styles.scss';

class CompanyCommentsForm extends React.Component {

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
    const { onSubmit, companyId } = this.props;
    const { text } = this.state;
    const promise = onSubmit(companyId, text).then(data => {
      //todo: slight performance issue here
      this.setState({ text: '' });
      return data;
    });
    return wrapPromiseWithProgress(promise);
  }

  render() {
    const { loggedUser, companyId } = this.props;
    const { text } = this.state;
    if (loggedUser) {
      return (
        <form action="/addComment" className={styles.form} method="post" onSubmit={this.handleSubmit}>
          <input type="hidden" name="_company" value={companyId} />
          <h2>
            Додати коментар
          </h2>
          <div className={styles.row}>
            <div className={styles.rowImage}>
              <Avatar user={loggedUser} />
            </div>
            <textarea
              name="text"
              value={text}
              onChange={this.handleTextChange}
              placeholder="Введіть ваш коментар"
              maxLength="500"
            />
          </div>
          <div className={styles.actions}>
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

}

CompanyCommentsForm.propTypes = {
  loggedUser: PropTypes.object,
  companyId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CompanyCommentsForm;
