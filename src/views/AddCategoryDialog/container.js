import React from 'react';
import PropTypes from 'prop-types';

import { save } from 'actions/addCategory';
import { get } from 'actions/company';
import { get as getCategories } from 'actions/category';
import { enhanceView } from 'components/View';

import AddCategoryDialogComponent from './AddCategoryDialog';
import SuccessView from './SuccessView';

const filterCategories = (allCategories, companyCategories) =>
  allCategories.filter((item) => {
    return !companyCategories
      .map((category) => category.name)
      .includes(item.name);
  });

class AddCategoryDialogContainer extends React.Component {
  static fetch(location, { dispatch, params }) {
    const { companyId } = params;
    return [
      {
        prop: 'company',
        promise: dispatch(get(companyId)),
      },
      {
        prop: 'categoriesList',
        promise: dispatch(getCategories()),
      },
    ];
  }

  state = {
    selectedCategories: [],
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    const companyId = this.props.initialData.company._id;
    const { selectedCategories } = this.state;
    return onSubmit({
      companyId,
      selectedCategories: selectedCategories.map((item) => item.name),
    });
  };

  onSelectCategory = (checked, value) => {
    const newCategories = [...this.state.selectedCategories].filter(
      (category) => category !== value
    );
    checked && newCategories.push(value);
    this.setState({ selectedCategories: newCategories });
  };

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

AddCategoryDialogContainer.propTypes = {
  initialData: PropTypes.shape({
    company: PropTypes.shape({
      _id: PropTypes.number.isRequired,
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
        })
      ),
    }).isRequired,
    categoriesList: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onSubmit: PropTypes.func,
};

const mapProps = (dispatch) => ({
  onSubmit: (params) => dispatch(save(params)),
  onSuccess: ({ showSuccessView }) => showSuccessView(SuccessView),
});

export default enhanceView(mapProps)(AddCategoryDialogContainer);
