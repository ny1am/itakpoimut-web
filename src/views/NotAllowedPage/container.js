import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import NotAllowedPageComponent from './NotAllowedPage';

class NotAllowedPageContainer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      timer: null,
      timeToGo: 5,
    };
  }

  componentWillMount() {
    const timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick() {
    const timeToGo = this.state.timeToGo - 1;
    if (timeToGo > 0) {
      this.setState({ timeToGo });
    } else {
      clearInterval(this.state.timer);
      this.props.redirect();
    }
  }

  render() {
    return (
      <NotAllowedPageComponent timeToGo={this.state.timeToGo} />
    );
  }
}

NotAllowedPageContainer.propTypes = {
  redirect: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  redirect: () => dispatch(push('/')),
  dispatch
});

export default connect(null, mapDispatchToProps)(NotAllowedPageContainer);
