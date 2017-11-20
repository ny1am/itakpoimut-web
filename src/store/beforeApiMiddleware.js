import { CALL_API } from 'redux-api-middleware';
import { CALL_TOKEN_API } from 'constants';
import { loadAuth } from './storage';

/**
 * CALL_TOKEN_API handler. Intercept actions with this constant and add auth headers to request.
 */
export default () => next => action => {
  if (!action) {
    return;
  }
  const callAuthApi = action[CALL_TOKEN_API];

  if (callAuthApi) {
    const auth = loadAuth() || {};

    callAuthApi.headers = Object.assign({}, callAuthApi.headers, {
      Authorization: `JWT ${auth.token}`,
    });

    const nextAction = {
      [CALL_API]: callAuthApi
    };

    return next(nextAction);
  }

  return next(action);
};
