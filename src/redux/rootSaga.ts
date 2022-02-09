import {all, fork} from 'redux-saga/effects';
import homeSaga from './home/sagas';
import mostReadSaga from './mostRead/sagas';

export function* rootSaga() {
  yield all([
    fork(homeSaga),
    fork(mostReadSaga),
  ]);
}
