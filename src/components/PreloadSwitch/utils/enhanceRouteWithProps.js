import React from 'react';

const enhanceRouteWithProps = (element, passThroughProps) => {
  const Component = element.props.component;
  return React.cloneElement(element, {
    component: null,
    render: (props) => (//eslint-disable-line
      <Component {...props} {...passThroughProps} />
    )
  });
};

export default enhanceRouteWithProps;
