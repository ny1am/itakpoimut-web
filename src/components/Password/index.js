import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

class Password extends React.PureComponent {

  state = {
    hidden: true
  };

  toggle = () => {
    this.setState({ hidden: !this.state.hidden });
  }

  render() {
    const { hidden } = this.state;
    const { className, ...props } = this.props;
    return (
      <div className={styles.wrapper}>
        <input
          className={cn(styles.password, className)}
          {...props}
          type={hidden?'password':'text'}
        />
        <button
          type="button"
          className={cn(styles.toggle, { [styles.shown]: !hidden })}
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
