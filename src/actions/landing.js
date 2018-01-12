import { DEFERRED } from 'constants';
import { LANDING_REQUEST } from 'constants/landing';

export function get() {
  return ({
    type: LANDING_REQUEST,
    [DEFERRED]: true,
  });
}
