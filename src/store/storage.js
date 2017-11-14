const TOKEN = 'itp_token';

export const loadToken = () => {
  try {
    const serializedState = localStorage.getItem(TOKEN);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const hasToken = () => {
  const token = loadToken();
  return token?true:false;
};

export const saveToken = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    if (serializedState) {
      localStorage.setItem(TOKEN, serializedState);
    } else {
      localStorage.removeItem(TOKEN);
    }
  } catch (err) {
    //ignore this
  }
};
