import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

class ShowHideWrapper extends React.Component {
  constructor(props) {
    super(props);
    const hidden = true;
    this.state = {
      hidden,
      visibilityMap: this.prepareVisibilityMap(hidden),
    };
  }

  toggle = () => {
    const hidden = !this.state.hidden;
    this.setState({ hidden }, this.changeVisibility);
  };

  changeVisibility() {
    const visibilityMap = this.prepareVisibilityMap(this.state.hidden);
    this.setState({ visibilityMap });
  }

  prepareVisibilityMap(hidden) {
    const result = {};
    if (hidden) {
      this.props.items.filter((item) => item.priority).forEach((item) => {
        result[item.key] = Object.keys(result).length < this.props.size;
      });
      this.props.items.filter((item) => !item.priority).forEach((item) => {
        result[item.key] = Object.keys(result).length < this.props.size;
      });
    } else {
      this.props.items.forEach((item) => {
        result[item.key] = true;
      });
    }
    return result;
  }

  render() {
    const { visibilityMap, hidden } = this.state;
    const { items, className } = this.props;
    const visibleItems = items.filter((item) => visibilityMap[item.key]);
    return (
      <React.Fragment>
        <ul className={className || ''}>
          {visibleItems.map((item) => (
            <li key={item.key} className="row">
              {item.node}
            </li>
          ))}
        </ul>
        <div
          className={cn(
            styles.trigger,
            { [styles.close]: hidden },
            { [styles.open]: !hidden }
          )}
          onClick={this.toggle}
        />
      </React.Fragment>
    );
  }
}

ShowHideWrapper.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.node.isRequired,
      key: PropTypes.string.isRequired,
      priority: PropTypes.bool,
    })
  ).isRequired,
};

export default ShowHideWrapper;
