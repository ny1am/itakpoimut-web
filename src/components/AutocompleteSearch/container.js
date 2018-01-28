import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import debounce from 'lodash.debounce';
import onClickOutside from "react-onclickoutside";

import { search } from 'actions/autocomplete';

import AutocompleteSearchComponent from './AutocompleteSearch';

//todo: clean up this component, use portals
class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      title: '',
      category: '',
      companies: []
    };
    this.changeTitle = this.changeTitle.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.search = this.search.bind(this);
    this.delayedSearch = debounce(this.search, 300);
    this.hidePopup = this.hidePopup.bind(this);
  }
  changeTitle(event) {
    const title = event.target.value;
    this.setState({ title }, this.delayedSearch);
  }
  changeCategory(event) {
    const category = event.target.value;
    this.setState({ category }, this.delayedSearch);
  }
  onSubmit(event) {
    event.preventDefault();
    const { title, category: selectedCategory } = this.state;
    this.props.onSubmit({ title, selectedCategory });
  }
  search() {
    const { title, category } = this.state;
    this.props.onSearch({ title, category }).then(data => {
      this.setState({
        companies: data.results,
        shown: true,
      });
    });
  }
  hidePopup() {
    const shown = false;
    this.setState({ shown });
  }

  render() {
    return (
      <AutocompleteSearchComponent
        {...this.props}
        {...this.state}
        search={this.search}
        changeTitle={this.changeTitle}
        changeCategory={this.changeCategory}
        onSubmit={this.onSubmit}
      />
    );
  }

}

Container.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSearch: (params) => dispatch(search(params)),
  onSubmit: (params) => dispatch(push({
    pathname: '/companies',
    search: queryString.stringify(params),
  })),
  dispatch
});

export default connect(null, mapDispatchToProps)(
  onClickOutside(Container, {
    handleClickOutside: instance => (instance.hidePopup)
  })
);
