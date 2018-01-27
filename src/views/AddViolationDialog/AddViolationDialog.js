import React from 'react';
import PropTypes from 'prop-types';

import CheckRow from 'components/CheckRow';

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

  handleViolationChange(checked, value) {
    const { selectedViolations } = this.state;
    const newViolations = selectedViolations.filter(item => item !== value);
    checked && newViolations.push(value);
    this.setState({ selectedViolations: newViolations });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { companyId, onSubmit } = this.props;
    const { selectedViolations } = this.state;
    onSubmit({
      companyId,
      selectedViolations: selectedViolations.map(item => item.name),
    });
  }

  render() {
    const { violationsList, company } = this.props;
    const { selectedViolations } = this.state;
    const filteredViolations = violationsList.filter(
      item => company.violations.map(v => v.name).indexOf(item.name) === -1
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
                <CheckRow text={item.text}
                  name="selectedViolations[]"
                  value={item.name}
                  checked={selectedViolations.indexOf(item) > -1}
                  onChange={
                    ({ target: { checked } }) =>
                      this.handleViolationChange(checked, item)
                  }
                />
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
    violations: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })),
  }),
  violationsList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddViolationDialog;
