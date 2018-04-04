---
to: _tmp/<%= name %>/container.js
---
import React from 'react';

import <%= name %>Component from './<%= name %>';

class <%= name %>Container extends React.PureComponent {
  render() {
    return (
      <<%= name %>Component {...this.props} />
    );
  }
}

export default <%= name %>Container;
