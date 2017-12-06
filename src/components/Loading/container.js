import { connect } from 'react-redux';

import LoadingComponent from './Loading';

const mapStateToProps = (state) => ({
  appReady: state.global.appReady,
});

export default connect(mapStateToProps)(LoadingComponent);
