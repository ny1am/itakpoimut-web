import { APP_READY, GENERIC_REQUEST_ERROR } from 'consts';

export const appReady = () => ({
  type: APP_READY,
});

export const requestError = (error) => ({
  type: GENERIC_REQUEST_ERROR,
  error,
});
