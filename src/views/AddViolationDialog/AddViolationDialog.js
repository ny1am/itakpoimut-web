import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Helmet } from 'react-helmet';

import CheckRow from 'components/CheckRow';
import { preventDefault } from 'utils';

import styles from './styles.scss';

class AddViolationDialog extends React.PureComponent {
  render() {
    const { violations, selectedViolations, onSelectViolation } = this.props;
    const onSubmit = preventDefault(this.props.onSubmit);
    return (
      <React.Fragment>
        <Helmet>
          <title>Запропонувати порушення</title>
        </Helmet>
        <div className={cn('dialog_content', styles.wrapper)}>
          <h1>Додати порушення</h1>
          <form action="/addViolation" method="post" onSubmit={onSubmit}>
            <p>Тут ви можете відмітити порушення компанії</p>
            <ul className={styles.violations}>
              {violations.map((item) => (
                <li key={item.name} className="row">
                  <CheckRow
                    text={item.text}
                    name="selectedViolations[]"
                    value={item.name}
                    checked={selectedViolations.includes(item)}
                    onChange={({ target: { checked } }) =>
                      onSelectViolation(checked, item)
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
      </React.Fragment>
    );
  }
}

const violationsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })
);

AddViolationDialog.propTypes = {
  violations: violationsPropType,
  selectedViolations: violationsPropType,
  onSelectViolation: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddViolationDialog;
