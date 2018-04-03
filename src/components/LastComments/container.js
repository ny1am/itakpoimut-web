import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getLastComments } from 'actions/landing';
import LastCommentsComponent from './LastComments';

class LastCommentsContainer extends React.PureComponent {

  state = {
    comments: null
  }

  componentDidMount() {
    return this.props.onInit().then(comments => {
      this.setState({ comments });
      return comments;
    });
  }

  render() {
    const { comments } = this.state;
    return <LastCommentsComponent comments={comments} />;
  }
}

LastCommentsContainer.propTypes = {
  comments: PropTypes.array,
  onInit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onInit: () => dispatch(getLastComments())
});

export default connect(null, mapDispatchToProps)(LastCommentsContainer);
