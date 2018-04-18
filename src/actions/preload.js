import { PRELOAD_LOCATION_CHANGED } from 'consts/preload';

export const locationChanged = ({ location, prevLocation }) => ({
  type: PRELOAD_LOCATION_CHANGED,
  location,
  prevLocation,
});
