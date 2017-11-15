import React from 'react';
import PropTypes from 'prop-types';

import AutocompleteCompany from './AutocompleteCompany';

class AutocompletePopup extends React.Component {
  render() {
    if (this.props.companies.length > 0 && this.props.shown) {
      return (
        <div className="autocomplete-popup">
          <ul className="autocomplete-results">
            {this.props.companies.map(company => (
              <li className="ac-results-row-h" key={company._id}>
                <AutocompleteCompany company={company} />
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

AutocompletePopup.propTypes = {
  companies: PropTypes.array.isRequired,
  shown: PropTypes.bool.isRequired
};

export default AutocompletePopup;