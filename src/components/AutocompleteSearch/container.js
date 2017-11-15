import { connect } from 'react-redux';

import { search } from 'actions/autocomplete';

import AutocompleteSearchComponent from './AutocompleteSearch';

const mapDispatchToProps = (dispatch) => ({
  onSearch: (params) => dispatch(search(params)),
  dispatch
});

export default connect(
  null, mapDispatchToProps
)(AutocompleteSearchComponent);
