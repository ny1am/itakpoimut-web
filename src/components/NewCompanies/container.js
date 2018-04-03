import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNewCompanies } from 'actions/landing';
import NewCompaniesComponent from './NewCompanies';

class NewCompaniesContainer extends React.PureComponent {

  state = {
    companies: null
  }

  componentDidMount() {
    return this.props.onInit().then(companies => {
      this.setState({ companies });
      return companies;
    });
  }

  render() {
    const { companies } = this.state;
    return <NewCompaniesComponent companies={companies} />;
  }
}

NewCompaniesContainer.propTypes = {
  companies: PropTypes.array,
  onInit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onInit: () => dispatch(getNewCompanies())
});

export default connect(null, mapDispatchToProps)(NewCompaniesContainer);
