import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { LoadingProvider } from 'components/Form';
import { hideIfNoData } from 'utils/enhancers';

import { dialogLocationSelector } from './selectors';
import DialogComponent from './Dialog';

class DialogContainer extends React.PureComponent {
  render() {
    const { location, loggedUser } = this.props;
    return (
      <LoadingProvider>
        <DialogComponent
          location={location}
          loggedUser={loggedUser}
        />
      </LoadingProvider>
    );
  }
}

DialogContainer.propTypes = {
  location: PropTypes.object,
  loggedUser: PropTypes.object,
};

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
  location: dialogLocationSelector(state)
});

const hasNoData = props => !(props.location);

export default compose(
  connect(mapStateToProps),
  hideIfNoData(hasNoData),
)(DialogContainer);
