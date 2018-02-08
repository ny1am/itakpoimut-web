import React from 'react';
import PropTypes from 'prop-types';

import { save } from 'actions/addCategory';
import { get } from 'actions/company';
import { get as getCategories } from 'actions/category';
import { enhanceDialog } from 'components/Dialog';

import AddCategoryDialogComponent from './AddCategoryDialog';

const filterCategories = (allCategories, companyCategories) => (
  allCategories.filter(item => {
    return !companyCategories
      .map(category => category.name).includes(item.name);
  })
);

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      selectedCategories: []
    };
  }

  onSubmit() {
    const { companyId, onSubmit } = this.props;
    const { selectedCategories } = this.state;
    return onSubmit({
      companyId,
      selectedCategories: selectedCategories.map(item => item.name),
    });
  }

  onSelectCategory(checked, value) {
    const newCategories = [...this.state.selectedCategories].filter(
      category => category !== value
    );
    checked && newCategories.push(value);
    this.setState({ selectedCategories: newCategories });
  }

  render() {
    const { initialData } = this.props;
    const categories = initialData.categoriesList;
    const companyCategories = initialData.company.categories;
    const filteredCategories = filterCategories(categories, companyCategories);
    const { selectedCategories } = this.state;
    return (
      <AddCategoryDialogComponent
        companyCategories={companyCategories}
        selectedCategories={selectedCategories}
        categories={filteredCategories}
        onSelectCategory={this.onSelectCategory}
        onSubmit={this.onSubmit}
      />
    );
  }
}

Container.propTypes = {
  companyId: PropTypes.number,
  initialData: PropTypes.shape({
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
  }).isRequired,
  onSubmit: PropTypes.func,
};

const mapProps = (dispatch) => ({
  onInit: ({ companyId }) => {
    return [{
      prop: 'company',
      promise: dispatch(get(companyId))
    }, {
      prop: 'categoriesList',
      promise: dispatch(getCategories())
    }];
  },
  onSubmit: (params) => dispatch(save(params)),
  successText: 'Запит на додання сфери надіслано. Адміністратор розгляне його найближчим часом.',
});

export default enhanceDialog(mapProps)(
  Container
);
