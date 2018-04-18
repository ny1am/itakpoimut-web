import React from 'react';
import { renderNothing, branch, setDisplayName, compose } from 'recompose';

export const hideIfNoData = hasNoData => (
  compose(
    setDisplayName('HideIfNoDataEnhancer'),
    branch(
      hasNoData,
      renderNothing
    )
  )
);

// todo: revise to hoc
export const wrapWithConsumer = ({ Context, Component, propName }) => {
  const WithConsumer = (props) => (
    <Context.Consumer>
      {value => <Component {...props} {...{[propName]: value}} />}
    </Context.Consumer>
  );
  return WithConsumer;
};

// todo: revise to hoc
export const ConditionalWrap = ({condition, wrap, children}) =>
  (condition ? wrap(children) : children);
