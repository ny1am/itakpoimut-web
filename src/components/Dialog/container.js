import { connect } from 'react-redux';
import { compose } from 'recompose';

import { hideIfNoData } from 'utils/enhancers';

import { dialogLocationSelector } from './selectors';
import DialogComponent from './Dialog';

const mapStateToProps = (state) => ({
  location: dialogLocationSelector(state)
});

const hasNoData = props => !(props.location);

export default compose(
  connect(mapStateToProps),
  hideIfNoData(hasNoData),
)(DialogComponent);
