import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class Password extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {hidden: true};
  }

  toggle() {
    this.setState({hidden: !this.state.hidden});
  }

  render() {
    const { hidden } = this.state;
    const { className, ...props } = this.props;
    const inputClassName = `${styles.password} ${className||''}`;
    const toggleClassName = `${styles.toggle} ${hidden?'':styles.shown}`;
    return (
      <div className={styles.wrapper}>
        <input
          className={inputClassName}
          {...props}
          type={hidden?'password':'text'}
        />
        <div
          className={toggleClassName}
          title={hidden?'Показати пароль':'Сховати пароль'}
          onClick={this.toggle}
        />
      </div>
    );
  }
}

Password.propTypes = {
  className: PropTypes.string,
};

export default Password;
