import {all, fork} from 'redux-saga/effects';
import homeSaga from './home/sagas';
export function* rootSaga() {
  yield all([
    fork(homeSaga),
  ]);
}
