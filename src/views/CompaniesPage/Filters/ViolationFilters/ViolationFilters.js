import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'components/Checkbox';

import styles from '../styles.scss';

class ViolationFilters extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked, value) {
    const { onAddViolationFilter, onRemoveViolationFilter } = this.props;
    const fn = checked ? onAddViolationFilter : onRemoveViolationFilter;
    fn(value);
    this.props.refresh();
  }

  render() {
    const { value, list } = this.props;
    return (
      <React.Fragment>
        <h3 className={styles.searchSubtitle}>
          Порушення
        </h3>
        <ul className={styles.searchGroup}>
          {list.map((violation, index) => (
            <li key={index} className="row">
              <div className="check-row">
                <Checkbox id={"vlt_"+violation.name}
                  className="row-checkbox"
                  name="selectedViolations[]"
                  value={violation.name}
                  checked={value.indexOf(violation.name) !== -1}
                  onChange={
                    ({ target: { checked } }) => this.handleChange(checked, violation.name)
                  }
                />
                <label htmlFor={"vlt_"+violation.name}>
                  {violation.text}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

ViolationFilters.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string.isRequired),
  list: PropTypes.array.isRequired,
  onAddViolationFilter: PropTypes.func.isRequired,
  onRemoveViolationFilter: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default ViolationFilters;
