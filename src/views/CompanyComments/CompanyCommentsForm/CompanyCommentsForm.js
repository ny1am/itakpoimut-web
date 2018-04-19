import React from 'react';
import PropTypes from 'prop-types';
import { branch, renderComponent } from 'recompose';

import Avatar from 'components/Avatar';
import { preventDefault } from 'utils';

import NotLoggedIn from './NotLoggedIn';
import styles from './styles.scss';

class CompanyCommentsForm extends React.PureComponent {
  render() {
    const { loggedUser, text, onTextChange } = this.props;
    const onSubmit = preventDefault(this.props.onSubmit);
    return (
      <form
        action="/addComment"
        className={styles.form}
        method="post"
        onSubmit={onSubmit}
      >
        <h2>Додати коментар</h2>
        <div className={styles.row}>
          <div className={styles.rowImage}>
            <Avatar user={loggedUser} />
          </div>
          <textarea
            name="text"
            value={text}
            onChange={({ target: { value } }) => onTextChange(value)}
            placeholder="Введіть ваш коментар"
            maxLength="500"
          />
        </div>
        <div className={styles.actions}>
          <button className="dialog__button" type="submit">
            Додати коментар
          </button>
        </div>
      </form>
    );
  }
}

CompanyCommentsForm.propTypes = {
  text: PropTypes.string,
  loggedUser: PropTypes.object,
  onTextChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const notLoggedIn = (props) => !props.loggedUser;

const enhance = (notLoggedIn) =>
  branch(notLoggedIn, renderComponent(NotLoggedIn));

export default enhance(notLoggedIn)(CompanyCommentsForm);
