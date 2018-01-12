import { fork, all } from 'redux-saga/effects';

import landingSaga from './landing';

export default function* rootSaga() {
  yield all([
      fork(landingSaga),
  ]);
}
