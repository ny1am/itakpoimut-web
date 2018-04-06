import React from 'react';

const enhanceRouteWithProps = (element, passThroughProps) => {
  //todo: account props.component
  const routeRender = element.props.render;
  //todo: do i need to clon here?
  return React.cloneElement(element, {
    component: null,
    render: (props) => routeRender({...props, ...passThroughProps})
  });
};

export default enhanceRouteWithProps;
