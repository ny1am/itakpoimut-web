import React from 'react';
import PropTypes from 'prop-types';

import CheckRow from 'components/CheckRow';

import styles from './styles.scss';

const filterCategories = (allCategories, companyCategories) => (
  allCategories.filter(item => {
    return companyCategories
      .map(category => category.name).indexOf(item.name) === -1;
  })
);

class AddCategoryDialog extends React.Component {

  constructor(props) {
    super(props);
    this.selectCategory = this.selectCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      selected: []
    };
  }

  selectCategory(checked, value) {
    let { selected: newCategories } = this.state;
    newCategories = newCategories.filter(category => category !== value);
    if (checked) {
      newCategories = [...newCategories, value];
    }
    this.setState({ selected: newCategories });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { companyId, onSubmit } = this.props;
    const { selected } = this.state;
    onSubmit({
      companyId,
      selectedCategories: selected.map(item => item.name),
    });
  }

  renderCompanyCategories() {
    const { company: { categories: list } } = this.props;
    if (list.length > 0) {
      return (
        <ul className={styles.prevCategories}>
          {list.map((item, index) =>(
            <li key={index}>
              {item.text}
            </li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  }

  renderCategories() {
    const { categoriesList, company: { categories } } = this.props;
    const { selected } = this.state;
    const list = filterCategories(categoriesList, categories);
    if (list.length > 0) {
      return (
        <div className={styles.categoriesHolder}>
          <span>Оберіть сфери зі списку:</span>
          <ul className={styles.categories}>
            {list.map((item, index) =>(
              <li key={index}>
                <CheckRow text={item.text}
                  name="selectedCategories[]"
                  value={item}
                  checked={selected.indexOf(item) > -1}
                  onChange={
                    ({ target: { checked } }) =>
                      this.selectCategory(checked, item)
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  renderUserSelectedCategories() {
    const { selected: list } = this.state;
    if (list.length > 0) {
      return (
        <ul className={styles.newCategories}>
          {list.map((item, index) => (
            <li key={index}>
              <div className={styles.newTitle}>
                {item.text}
              </div>
              <div className={styles.delete}
                onClick={() => this.selectCategory(false, item)}
              />
            </li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className={`dialog_content ${styles.wrapper}`}>
        <h1>
          Додати сферу
        </h1>
        <p>
          Тут ви можете відзначити сфери, до яких належить компанія. Протягом кількох днів адміністратор перевірить інформацію і вона з'явиться на сайті.
        </p>
        <form action="/addCategory" method="post" onSubmit={this.handleSubmit}>
          <div className={styles.prevCategoriesHolder}>
            <span>Уже відмічені сфери</span>
            <div className={styles.prevCategoriesBlock}>
              {this.renderCompanyCategories()}
              {this.renderUserSelectedCategories()}
            </div>
          </div>
          {this.renderCategories()}
          <div className={styles.actions}>
            <button className="dialog__button" type="submit">
              Готово
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AddCategoryDialog.propTypes = {
  companyId: PropTypes.number,
  company: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }))
  }).isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })),
  onSubmit: PropTypes.func,
};

AddCategoryDialog.defaultProps = {
  categoriesList: []
};

export default AddCategoryDialog;
