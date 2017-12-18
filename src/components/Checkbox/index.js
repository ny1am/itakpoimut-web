import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class Checkbox extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {checked: props.checked};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({checked: nextProps.checked});
    }
  }

  handleChange(el) {
    const { onChange } = this.props;
    onChange && onChange(el);
    this.setState({checked: el.target.checked});
  }

  render() {
    const { className, id, ...props } = this.props;
    const wrapperClassName = `${styles.checkbox} ${className||''}`;
    return (
      <div className={wrapperClassName} {...this.state.checked?{'data-checked':''}:{}}>
        <input id={id} type="checkbox" {...props} checked={this.state.checked} onChange={this.handleChange}/>
        <label htmlFor={id} />
      </div>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default Checkbox;
