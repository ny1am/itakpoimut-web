import React from 'react';
import PropTypes from 'prop-types';

import { get as getViolations } from 'actions/violation';
import { get } from 'actions/company';
import { save } from 'actions/addViolation';
import { enhanceDialog } from 'components/Dialog';

import AddViolationDialogComponent from './AddViolationDialog';
import SuccessView from './SuccessView';

class AddViolationDialogContainer extends React.Component {

  static fetch(location, { dispatch, params }) {
    const { companyId } = params;
    return [{
      prop: 'company',
      promise: dispatch(get(companyId))
    }, {
      prop: 'violationsList',
      promise: dispatch(getViolations())
    }];
  }

  constructor(props) {
    super(props);
    this.onSelectViolation = this.onSelectViolation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      selectedViolations: [],
    };
  }

  onSelectViolation(checked, value) {
    const { selectedViolations } = this.state;
    const newViolations = selectedViolations.filter(item => item !== value);
    checked && newViolations.push(value);
    this.setState({ selectedViolations: newViolations });
  }

  onSubmit() {
    const { onSubmit } = this.props;
    const companyId = this.props.initialData.company._id;
    const { selectedViolations } = this.state;
    return onSubmit({
      companyId,
      selectedViolations: selectedViolations.map(item => item.name),
    });
  }

  render() {
    const { violationsList, company } = this.props.initialData;
    const { selectedViolations } = this.state;
    const filteredViolations = violationsList.filter(
      item => !company.violations.map(v => v.name).includes(item.name)
    );
    return (
      <AddViolationDialogComponent
        violations={filteredViolations}
        selectedViolations={selectedViolations}
        onSelectViolation={this.onSelectViolation}
        onSubmit={this.onSubmit}
      />
    );
  }
}

AddViolationDialogContainer.propTypes = {
  initialData: PropTypes.shape({
    company: PropTypes.shape({
      _id: PropTypes.number.isRequired,
      violations: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })),
    }),
    violationsList: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapProps = (dispatch) => ({
  onSubmit: (params) => dispatch(save(params)),
  SuccessView,
});

export default enhanceDialog(mapProps)(
  AddViolationDialogContainer
);
