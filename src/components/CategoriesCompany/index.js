import React from 'react';
import PropTypes from 'prop-types';

import DialogLink from 'components/DialogLink';

import styles from './styles.scss';

class CategoriesCompany extends React.PureComponent {
  render() {
    const { company } = this.props;
    return (
      <ul className={styles.categories}>
        {company.categories.map((item, index) => (
          <li key={index} className={styles.item}>
            {item.text}
          </li>
        ))}
        <li>
          <DialogLink
            to={`/add-category/${company._id}`}
            className={styles.addCategory}
          >
            Додати сферу
          </DialogLink>
        </li>
      </ul>
    );
  }
}

CategoriesCompany.propTypes = {
  company: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CategoriesCompany;
