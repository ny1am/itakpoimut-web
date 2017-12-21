import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class ShowHideWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeVisibility = this.changeVisibility.bind(this);
    this.prepareVisibility = this.prepareVisibility.bind(this);
    let hidden = true;
    this.state = {
      hidden,
      visibility: this.prepareVisibility(hidden)
    };
  }

  toggle() {
    this.setState({hidden: !this.state.hidden}, this.changeVisibility);
  }

  changeVisibility() {
    this.setState({visibility: this.prepareVisibility(this.state.hidden)});
  }

  //todo: no more then props.size; currently in may show {size+1}
  prepareVisibility(hidden) {
    let visibility = {};
    if (hidden) {
      this.props.children.map((item, index) => {
        visibility[item.key] = (index<this.props.size || item.props.checked);
      });
    } else {
      this.props.children.map((item) => {
        visibility[item.key] = true;
      });
    }
    return visibility;
  }

  renderToggleElement() {
    const toggleClassName = `${styles.trigger} ${this.state.hidden?styles.close:styles.open}`;
    return (
      <div className={toggleClassName} onClick={this.toggle} />
    );
  }

  //todo: revise this
  render() {
    return (
      <div>
        <ul className={this.props.className||''}>
          {this.props.children.map((item, index) => (
            <li key={index} className={"row"+(!this.state.visibility[item.key]?" hidden":"")}>
              {item}
            </li>
          ))}
        </ul>
        {this.renderToggleElement()}
      </div>
    );
  }

}

ShowHideWrapper.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ShowHideWrapper;
