import React from 'react';
import PropTypes from 'prop-types';
import randomstring from 'randomstring';

import Checkbox from 'components/Checkbox';

import styles from './styles.scss';

class CheckRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id || randomstring.generate(7),
    };

  }

  render() {
    const { id } = this.state;
    const { text, checked, ...props } = this.props;
    return (
      <div className={styles.wrapper}>
        <Checkbox
          {...props}
          checked={checked}
          className={styles.box}
          id={id}
        />
        <label className={checked?styles.checked:''} htmlFor={id}>
          {text}
        </label>
      </div>
    );
  }
}

CheckRow.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckRow;
