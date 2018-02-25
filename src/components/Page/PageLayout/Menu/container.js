import { connect } from 'react-redux';

import { hide } from 'actions/menu';

import MenuComponent from './Menu';

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
  shown: state.menu,
});

const mapDispatchToProps = (dispatch) => ({
  onMenuHide: () => dispatch(hide()),
  dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(MenuComponent);
