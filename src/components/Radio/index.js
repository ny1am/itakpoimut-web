import React from 'react';
import PropTypes from 'prop-types';
import randomstring from 'randomstring';

import styles from './styles.scss';

class Radio extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      id: props.id || randomstring.generate(7),
      checked: props.checked || false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  handleChange(el) {
    const { onChange } = this.props;
    const checked = el.target.checked;
    onChange && onChange(el);
    this.setState({ checked });
  }

  render() {
    const { className, ...props } = this.props;
    const { checked, id } = this.state;
    const wrapperClassName = `${styles.radio} ${className||''}`;
    return (
      <div className={wrapperClassName}>
        <input type="radio"
          {...props}
          id={id}
          checked={checked}
          onChange={this.handleChange}
        />
        <label htmlFor={id} />
      </div>
    );
  }
}

Radio.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default Radio;
