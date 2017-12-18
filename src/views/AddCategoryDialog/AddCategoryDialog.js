import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'components/Checkbox';
import { categoryByName } from 'utils';

import styles from './styles.scss';

class AddCategoryDialog extends React.Component {

  constructor(props) {
    super(props);
    this.selectCategory = this.selectCategory.bind(this);
    this.deleteSelectedCategory = this.deleteSelectedCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      companyId: props.companyId,
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

  selectCategory(event) {
    let selectedCategories = this.state.userSelectedCategories;
    if (event.target.checked) {
      selectedCategories.push(event.target.value);
    } else {
      let index = selectedCategories.indexOf(event.target.value);
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
    this.props.onSubmit({
      companyId: this.props.companyId,
      selectedCategories: this.state.userSelectedCategories,
    });
  }

  renderCompanyCategories() {
    function renderList(list) {
      return list.map((item, index) =>(
        <li key={index}>
          {categoryByName(item)}
        </li>
      ));
    }
    if (this.props.companyCategories.length > 0) {
      return (
        <ul className="prev-categories">
          {renderList(this.props.companyCategories)}
        </ul>
      );
    } else {
      return null;
    }
  }

  renderCategories() {
    function renderList(list, selectedCategories, selectCategory) {
      return list.map((item, index) =>(
        <li key={index}>
          <div className="check-row">
            <Checkbox id={"ctg_"+item} name="selectedCategories[]" value={item} checked={selectedCategories.indexOf(item) > -1} onChange={selectCategory} className="row-checkbox" />
            <label htmlFor={"ctg_"+item}>
              {categoryByName(item)}
            </label>
          </div>
        </li>
      ));
    }
    if (this.props.categoriesList.length > 0) {
      return (
        <div className="categories-holder">
          <span>Оберіть сфери зі списку:</span>
          <ul className="categories">
            {renderList(this.props.categoriesList, this.state.userSelectedCategories, this.selectCategory)}
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
          <div className="selected-category-title">
            {categoryByName(item)}
          </div>
          <div className="delete-category" onClick={()=>{deleteSelectedCategory(item);}} />
        </li>
      ));
    }
    if (this.state.userSelectedCategories.length > 0) {
      return (
        <ul className="selected-categories-mirror">
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
        <h1 className="dialog__h1">
          Додати сферу
        </h1>
        <p>
          Тут ви можете відзначити сфери, до яких належить компанія. Протягом кількох днів адміністратор перевірить інформацію і вона з'явиться на сайті.
        </p>
        <form action="/addCategory" method="post" onSubmit={this.handleSubmit}>
          <div className="prev-categories-holder">
            <span>Уже відмічені сфери</span>
            <div className="prev-categories-block">
              {this.renderCompanyCategories()}
              {this.renderUserSelectedCategories()}
            </div>
          </div>
          {this.renderCategories()}
          <div className="right-content">
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
  categoriesList: PropTypes.array,
  companyCategories: PropTypes.array,
  onSubmit: PropTypes.func,
};

AddCategoryDialog.defaultProps = {
  companyCategories: [],
  categoriesList: []
};

export default AddCategoryDialog;
