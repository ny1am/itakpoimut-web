import React from 'react';
import PropTypes from 'prop-types';

import CheckRow from 'components/CheckRow';
import loyaltyList from 'utils/enums/loyalty';

import styles from '../styles.scss';

class LoyaltyFilters extends React.PureComponent {

  onChange = ({ target: { checked, value } }) => {
    return this.props.onChange(checked, value);
  }

  render() {
    const { value } = this.props;
    return (
      <React.Fragment>
        <h3 className={styles.searchSubtitle}>
          За лояльністю
        </h3>
        <ul className={styles.searchGroup}>
          {loyaltyList.map(loyalty => (
            <li key={loyalty.name} className="row">
              <CheckRow
                type="radio"
                name="selectedLoyalty"
                value={loyalty.name}
                checked={loyalty.name===value}
                onChange={this.onChange}
                text={loyalty.text}
                textClassName={`loyalty-color ${loyalty.name}`}
              />
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

LoyaltyFilters.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default LoyaltyFilters;
