export const extractDialogLocation = (location) => {
  if (location.state && location.state.dialog) {
    return {
      pathname: location.pathname,
    };
  }
  return undefined;
};
