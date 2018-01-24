import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'components/Checkbox';

import styles from './styles.scss';

class AddCategoryDialog extends React.Component {

  constructor(props) {
    super(props);
    this.selectCategory = this.selectCategory.bind(this);
    this.deleteSelectedCategory = this.deleteSelectedCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      userSelectedCategories: []
    };
  }

  deleteSelectedCategory(category) {
    let selectedCategories = this.state.userSelectedCategories;
    let index = selectedCategories.indexOf(category);
    if (index > -1) {
      selectedCategories.splice(index, 1);
    }
    this.setState({
      userSelectedCategories: selectedCategories
    });
  }

  selectCategory(checked, value) {
    let selectedCategories = this.state.userSelectedCategories;
    if (checked) {
      selectedCategories.push(value);
    } else {
      let index = selectedCategories.indexOf(value);
      if (index > -1) {
        selectedCategories.splice(index, 1);
      }
    }
    this.setState({
      userSelectedCategories: selectedCategories
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { companyId } = this.props;
    const { userSelectedCategories } = this.state;
    this.props.onSubmit({
      companyId,
      selectedCategories: userSelectedCategories.map(item => item.name),
    });
  }

  renderCompanyCategories() {
    const { company } = this.props;
    if (company.categories.length > 0) {
      return (
        <ul className={styles.prevCategories}>
          {company.categories.map((item, index) =>(
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
    const { categoriesList, company } = this.props;
    const { userSelectedCategories } = this.state;
    const filteredCategoriesList = categoriesList.filter(item => {
      return company.categories
        .map(category => category.name).indexOf(item.name) === -1;
    });
    if (filteredCategoriesList.length > 0) {
      return (
        <div className={styles.categoriesHolder}>
          <span>Оберіть сфери зі списку:</span>
          <ul className={styles.categories}>
            {filteredCategoriesList.map((item, index) =>(
              <li key={index}>
                <div className="check-row">
                  <Checkbox id={"ctg_"+item.name}
                    className="row-checkbox"
                    name="selectedCategories[]"
                    value={item}
                    checked={userSelectedCategories.indexOf(item) > -1}
                    onChange={
                      ({ target: { checked } }) =>
                        this.selectCategory(checked, item)
                    }
                  />
                  <label htmlFor={"ctg_"+item.name}>
                    {item.text}
                  </label>
                </div>
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
    function renderList(list, deleteSelectedCategory) {
      return list.map((item, index) => (
        <li key={index}>
          <div className={styles.newTitle}>
            {item.text}
          </div>
          <div className={styles.delete} onClick={()=>{deleteSelectedCategory(item);}} />
        </li>
      ));
    }
    if (this.state.userSelectedCategories.length > 0) {
      return (
        <ul className={styles.newCategories}>
          {renderList(this.state.userSelectedCategories, this.deleteSelectedCategory)}
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
  //todo: shape here
  company: PropTypes.object.isRequired,
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
