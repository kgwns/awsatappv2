import { all, fork } from 'redux-saga/effects';
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
import allSiteCategoriesSaga from './allSiteCategories/sagas';
import termsAndAboutUs from './termsAndAboutUs/sagas'
import registerSaga from './register/sagas'
import loginSaga from './login/sagas';
import emailCheckSaga from './auth/sagas';
import videoListSaga from './videoList/sagas';
import topMenuSaga from './topMenu/sagas';
import opinionArticleDetailSaga from './opinionArticleDetail/sagas';
import userProfileSaga from './profileUserDetail/sagas'
import bookmarkSaga from './bookmark/sagas';
import newPasswordSaga from './changePassword/sagas'
import newsLettersSaga from './newsLetter/sagas';
import keepNotifiedSaga from './keepNotified/sagas';
import podcastSaga from './podcast/sagas';
import contentForYouSaga from './contentForYou/sagas';
import writerDetailSaga from './writersDetail/sagas';
import documentaryVideoSaga from './documentaryVideo/sagas';
import SaveTokenSaga from './notificationSaveToken/sagas';
import ContactUsSaga from './contactUs/sagas'
import WeatherDetailSaga from './weatherDetails/sagas'
import albumListSaga from './photoGallery/sagas';
import journalistSaga from './journalist/sagas';
import deleteMyAccountSaga from './deleteMyAccount/sagas';
import cartoonSaga from './cartoon/sagas';
import entityQueueSaga from './entityQueue/sagas';

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
    fork(allSiteCategoriesSaga),
    fork(termsAndAboutUs),
    fork(registerSaga),
    fork(loginSaga),
    fork(emailCheckSaga),
    fork(videoListSaga),
    fork(topMenuSaga),
    fork(opinionArticleDetailSaga),
    fork(bookmarkSaga),
    fork(userProfileSaga),
    fork(newPasswordSaga),
    fork(newsLettersSaga),
    fork(keepNotifiedSaga),
    fork(podcastSaga),
    fork(contentForYouSaga),
    fork(writerDetailSaga),
    fork(documentaryVideoSaga),
    fork(SaveTokenSaga),
    fork(ContactUsSaga),
    fork(WeatherDetailSaga),
    fork(albumListSaga),
    fork(journalistSaga),
    fork(deleteMyAccountSaga),
    fork(cartoonSaga),
    fork(entityQueueSaga)
  ]);
}
