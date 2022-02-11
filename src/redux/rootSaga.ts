import {all, fork} from 'redux-saga/effects';
import homeSaga from './home/sagas';
import mostReadSaga from './mostRead/sagas';
import searchSaga from './search/sagas';
import articleDetailSaga from './articleDetail/sagas'
import latestNews from './latestNews/sagas'

export function* rootSaga() {
  yield all([
    fork(homeSaga),
    fork(mostReadSaga),
    fork(searchSaga),
    fork(articleDetailSaga),
    fork(latestNews)
  ]);
}
