import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'components/Checkbox';

import styles from './styles.scss';

class AddViolationDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleViolationChange = this.handleViolationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      selectedViolations: [],
    };
  }

  handleViolationChange({ target: { value, checked } }) {
    const { selectedViolations } = this.state;
    const newViolations = selectedViolations.filter(item => item !== value);
    checked && newViolations.push(value);
    this.setState({ selectedViolations: newViolations });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({
      companyId: this.props.companyId,
      selectedViolations: this.state.selectedViolations,
    });
  }

  render() {
    const { violationsList, company } = this.props;
    const { selectedViolations } = this.state;
    const filteredViolations = violationsList.filter(
      item => company.violations.indexOf(item.name) === -1
    );
    return (
      <div className={`dialog_content ${styles.wrapper}`}>
        <h1>
          Додати порушення
        </h1>
        <form action="/addViolation" method="post" onSubmit={this.handleSubmit}>
          <p>
            Тут ви можете відмітити порушення компанії
          </p>
          <ul className={styles.violations}>
            {filteredViolations.map(item => (
              <li key={item.name} className="row">
                <div className="check-row">
                  <Checkbox id={"vlt_"+item.name}
                    className="row-checkbox"
                    name="selectedViolations[]"
                    value={item.name}
                    checked={selectedViolations.indexOf(item.name) > -1}
                    onChange={this.handleViolationChange}
                  />
                  <label htmlFor={"vlt_"+item.name}>
                    {item.text}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
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
  companyId: PropTypes.number.isRequired,
  company: PropTypes.shape({
    violations: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  violationsList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddViolationDialog;
