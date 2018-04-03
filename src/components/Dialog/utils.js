export const extractDialogLocation = (location) => {
  if (location.state && location.state.dialogType) {
    return ({
      pathname: location.state.dialogType
    });
  }
  return undefined;
};
