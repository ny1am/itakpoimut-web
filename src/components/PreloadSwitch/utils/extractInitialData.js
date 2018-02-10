import { keyValueToObjectReducer } from 'utils';

const extractInitialData = (names, values) => {
  const initialData = values
    .map((value, index) => ({
      key: names[index],
      value
    }))
    .filter(item => item.key)
    .reduce(keyValueToObjectReducer, {});
  return initialData;
};

export default extractInitialData;
