import React from 'react';
import PropTypes from 'prop-types';
import randomstring from 'randomstring';
import cn from 'classnames';

import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';

import styles from './styles.scss';

const types = {
  checkbox: Checkbox,
  radio: Radio,
};

class CheckRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id || randomstring.generate(7),
    };
  }

  render() {
    const { id } = this.state;
    const { text, textClassName, checked, type, ...props } = this.props;
    const Component = types[type];
    return (
      <div className={styles.wrapper}>
        <Component
          {...props}
          checked={checked}
          className={styles.box}
          id={id}
        />
        <label
          className={cn({ [styles.checked]: checked }, textClassName)}
          htmlFor={id}
        >
          {text}
        </label>
      </div>
    );
  }
}

CheckRow.defaultProps = {
  type: 'checkbox',
};

CheckRow.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['checkbox', 'radio']),
  text: PropTypes.string.isRequired,
  textClassName: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckRow;
