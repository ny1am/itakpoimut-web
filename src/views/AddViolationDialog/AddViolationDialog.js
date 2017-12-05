import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'components/Checkbox';
import { violationByName } from 'utils';

import styles from './styles.scss';

class AddViolationDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleViolationChange = this.handleViolationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      companyId: props.companyId,
      selectedViolations: [],
    };
  }

  handleViolationChange(e) {
    const value = e.target.value;
    let selectedViolations = this.state.selectedViolations;
    if (e.target.checked) {
      selectedViolations = selectedViolations.filter(item => item !== value);
      selectedViolations.push(value);
    } else {
      selectedViolations = selectedViolations.filter(item => item !== value);
    }
    this.setState({
      selectedViolations,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    const { violationsList } = this.props;
    const { selectedViolations } = this.state;
    return (
      <div className={`dialog_content ${styles.wrapper}`}>
        <h1 className="dialog__h1">
          Додати порушення
        </h1>
        <form action="/addViolation" method="post" onSubmit={this.handleSubmit}>
          <p>
            Тут ви можете відмітити порушення компанії
          </p>
          <ul className="violations">
            {violationsList.map(item => (
              <li key={item} className="row">
                <div className="check-row">
                  <Checkbox
                    id={"vlt_"+item}
                    name="selectedViolations[]"
                    value={item}
                    checked={selectedViolations.indexOf(item) > -1}
                    onChange={this.handleViolationChange}
                  />
                  <label htmlFor={"vlt_"+item}>
                    {violationByName(item)}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className="right-content">
            <button className="dialog__button" type="submit">
              Додати
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AddViolationDialog.propTypes = {
  violationsList: PropTypes.array,
  companyId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddViolationDialog;
