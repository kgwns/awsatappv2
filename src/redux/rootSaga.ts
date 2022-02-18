import {all, fork} from 'redux-saga/effects';
import homeSaga from './home/sagas';
import mostReadSaga from './mostRead/sagas';
import searchSaga from './search/sagas';
import articleDetailSaga from './articleDetail/sagas';
import latestNews from './latestNews/sagas';
import opinionWriterSaga from './writers/sagas';
import opinionsSaga from './opinions/sagas';
import sideMenuSaga from './sideMenu/sagas';
import sectionArticlesSaga from './sectionArticles/sagas';
import newsViewSaga from './newsView/sagas';
import allWritersSaga from './allWriters/sagas';

export function* rootSaga() {
  yield all([
    fork(homeSaga),
    fork(mostReadSaga),
    fork(searchSaga),
    fork(articleDetailSaga),
    fork(latestNews),
    fork(opinionWriterSaga),
    fork(opinionsSaga),
    fork(sideMenuSaga),
    fork(sectionArticlesSaga),
    fork(newsViewSaga),
    fork(allWritersSaga),
  ]);
}
