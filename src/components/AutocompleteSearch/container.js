import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';

import { search } from 'actions/autocomplete';

import AutocompleteSearchComponent from './AutocompleteSearch';

const mapDispatchToProps = (dispatch) => ({
  onSearch: (params) => dispatch(search(params)),
  onSubmit: (params) => dispatch(push({
    pathname: '/companies',
    search: queryString.stringify(params),
  })),
  dispatch
});

export default connect(
  null, mapDispatchToProps
)(AutocompleteSearchComponent);
