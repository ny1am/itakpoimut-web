import { CALL_API } from 'redux-api-middleware';

import { CALL_TOKEN_API } from 'constants';
import { PLEASE_SIGNUP_DIALOG } from 'constants/dialog';
import { showDialog } from 'actions/dialog';
import { logout } from 'actions/auth';

import { loadAuth } from '../storage';

/**
 * CALL_TOKEN_API handler. Intercept actions with this constant and add auth headers to request.
 */
export default ({ dispatch }) => next => action => {
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

    return next(nextAction).then((data) => {
      if (data.payload && data.payload.name === 'ApiError' && data.payload.status === 401) {
        dispatch(logout());
        return dispatch(showDialog(PLEASE_SIGNUP_DIALOG));
      }
      return data;
    });
  }

  return next(action);
};
