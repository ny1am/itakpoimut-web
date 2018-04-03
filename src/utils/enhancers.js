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
