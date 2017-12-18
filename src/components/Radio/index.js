import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class Radio extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {checked: props.defaultChecked || props.checked};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultChecked !== this.props.defaultChecked) {
      this.setState({checked: nextProps.defaultChecked});
    } else if (nextProps.checked !== this.props.checked) {
      this.setState({checked: nextProps.checked});
    }
  }

  handleChange(el) {
    if (this.props && this.props.onChange) {
      this.props.onChange(el);
    }
    this.setState({checked: el.target.checked});
  }

  render() {
    const { className, id, ...props } = this.props;
    const wrapperClassName = `${styles.radio} ${className||''}`;
    return (
      <div className={wrapperClassName} {...this.state.checked?{'data-checked':''}:{}}>
        <input id={id} type="radio" {...props} checked={this.state.checked} onChange={this.handleChange}/>
        <label htmlFor={this.props.id} />
      </div>
    );
  }
}

Radio.propTypes = {
  id: PropTypes.string,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default Radio;
