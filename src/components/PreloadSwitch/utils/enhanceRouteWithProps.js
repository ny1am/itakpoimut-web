import React from 'react';

const enhanceRouteWithProps = (element, Wrapper, passThroughProps) => {
  const Component = element.props.component;
  const WrapperComponent = Wrapper || React.Fragment;
  return React.cloneElement(element, {
    component: null,
    render: (props) => (//eslint-disable-line
      <WrapperComponent>
        <Component {...props} {...passThroughProps} />
      </WrapperComponent>
    )
  });
};

export default enhanceRouteWithProps;
