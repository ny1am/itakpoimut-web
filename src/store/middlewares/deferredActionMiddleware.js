import { DEFERRED } from 'constants';

const createExposedPromise = () => {
  const deferred = {};
  const promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return { promise, deferred };
};

export default () => next => action => {
  if (!action[DEFERRED]) {
    return next(action);
  }
  const { promise, deferred } = createExposedPromise();
  const nextAction = {...action, [DEFERRED]: deferred };
  next(nextAction);
  return promise;
};
