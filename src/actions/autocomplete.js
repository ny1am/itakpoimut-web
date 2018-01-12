import { DEFERRED } from 'constants';
import { AUTOCOMPLETE_REQUEST } from 'constants/autocomplete';

export function search({ title, category }) {
  return ({
    type: AUTOCOMPLETE_REQUEST,
    title,
    category,
    [DEFERRED]: true,
  });
}
