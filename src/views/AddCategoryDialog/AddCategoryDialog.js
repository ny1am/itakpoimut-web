import React from 'react';
import PropTypes from 'prop-types';

import CheckRow from 'components/CheckRow';
import { preventDefault } from 'utils';

import styles from './styles.scss';

class AddCategoryDialog extends React.Component {

  render() {
    const {
      selectedCategories, categories, companyCategories, onSelectCategory
    } = this.props;
    const onSubmit = preventDefault(this.props.onSubmit);
    return (
      <div className={`dialog_content ${styles.wrapper}`}>
        <h1>
          Додати сферу
        </h1>
        <p>
          Тут ви можете відзначити сфери, до яких належить компанія. Протягом кількох днів адміністратор перевірить інформацію і вона з'явиться на сайті.
        </p>
        <form action="/addCategory" method="post" onSubmit={onSubmit}>
          <div className={styles.prevCategoriesHolder}>
            <span>Уже відмічені сфери</span>
            <div className={styles.prevCategoriesBlock}>
              {companyCategories.length > 0 &&
                <ul className={styles.prevCategories}>
                  {companyCategories.map((item, index) =>(
                    <li key={index}>
                      {item.text}
                    </li>
                  ))}
                </ul>
              }
              {selectedCategories.length > 0 &&
                <ul className={styles.newCategories}>
                  {selectedCategories.map((item, index) => (
                    <li key={index}>
                      <div className={styles.newTitle}>
                        {item.text}
                      </div>
                      <div className={styles.delete}
                        onClick={() => onSelectCategory(false, item)}
                      />
                    </li>
                  ))}
                </ul>
              }
            </div>
          </div>
          {categories.length > 0 &&
            <div className={styles.categoriesHolder}>
              <span>Оберіть сфери зі списку:</span>
              <ul className={styles.categories}>
                {categories.map((item, index) =>(
                  <li key={index}>
                    <CheckRow text={item.text}
                      name="selectedCategories[]"
                      value={item}
                      checked={selectedCategories.indexOf(item) > -1}
                      onChange={
                        ({ target: { checked } }) => onSelectCategory(checked, item)
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          }
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

const categoriesPropType = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}));

AddCategoryDialog.propTypes = {
  companyCategories: categoriesPropType,
  selectedCategories: categoriesPropType,
  categories: categoriesPropType,
  onSelectCategory: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddCategoryDialog;
