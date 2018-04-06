export const loggedUserCheck = function(loggedUser) {
  return Boolean(loggedUser);
};

export const notLoggedUserCheck = function(loggedUser) {
  return !loggedUser;
};

export const userLocalProviderCheck = function(loggedUser) {
  return loggedUser && loggedUser.provider === 'local';
};
