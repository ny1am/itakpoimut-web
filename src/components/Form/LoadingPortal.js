import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Loading from './Loading';

class LoadingPortal extends React.PureComponent {

  constructor(props) {
    super(props);
    const holderEl = ReactDOM.findDOMNode(props.formRef).parentNode;
    this.containerEl = holderEl.querySelector('[data-loading-portal]');
  }

  render() {
    return ReactDOM.createPortal(<Loading />, this.containerEl);
  }
}

LoadingPortal.propTypes = {
  formRef: PropTypes.object.isRequired,
};

export default LoadingPortal;
