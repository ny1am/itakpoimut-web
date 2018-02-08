import React from 'react';

const enhanceRouteWithProps = (element, passThroughProps) => {
  const Component = element.props.component;
  return React.cloneElement(element, {
    component: null,
    render: (props) => (<Component {...props} {...passThroughProps} />)//eslint-disable-line
  });
};

export default enhanceRouteWithProps;
