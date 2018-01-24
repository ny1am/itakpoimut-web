import React from 'react';
import PropTypes from 'prop-types';

import Radio from 'components/Radio';
import loyalty from 'utils/enums/loyalty';

import styles from '../styles.scss';

class LoyaltyFilters extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked, value) {
    const selectedLoyalty = checked ? value : null;
    this.props.onChange(selectedLoyalty);
    this.props.refresh();
  }

  render() {
    const { value, list } = this.props;
    return (
      <React.Fragment>
        <h3 className={styles.searchSubtitle}>
          За лояльністю
        </h3>
        <ul className={styles.searchGroup}>
          {list.map((loyalty, index) => (
            <li key={index} className="row">
              <div className="check-row">
                <Radio
                  id={"rnk_"+loyalty.name}
                  name="selectedLoyalty"
                  value={loyalty.name}
                  checked={loyalty.name===value}
                  onChange={
                    ({ target: { checked } }) => this.handleChange(checked, loyalty.name)
                  }
                  className="row-checkbox"
                />
                <label htmlFor={"rnk_"+loyalty.name} className={"loyalty-color "+loyalty.name}>
                  {loyalty.text}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

LoyaltyFilters.defaultProps = {
  list: loyalty,
};

LoyaltyFilters.propTypes = {
  value: PropTypes.string,
  list: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default LoyaltyFilters;
