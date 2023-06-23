import { testSaga } from 'redux-saga-test-plan';
import { rootSaga } from '../rootSaga';
import { fork } from 'redux-saga/effects';
import homeSaga from 'src/redux/home/sagas';
import mostReadSaga from 'src/redux/mostRead/sagas';
import searchSaga from 'src/redux/search/sagas';
import articleDetailSaga from 'src/redux/articleDetail/sagas';
import latestNews from 'src/redux/latestNews/sagas';
import opinionWriterSaga from 'src/redux/writers/sagas';
import opinionsSaga from 'src/redux/opinions/sagas';
import sideMenuSaga from 'src/redux/sideMenu/sagas';
import sectionArticlesSaga from 'src/redux/sectionArticles/sagas';
import newsViewSaga from 'src/redux/newsView/sagas';
import allWritersSaga from 'src/redux/allWriters/sagas';
import allSiteCategoriesSaga from 'src/redux/allSiteCategories/sagas';
import termsAndAboutUs from 'src/redux/termsAndAboutUs/sagas'
import registerSaga from 'src/redux/register/sagas'
import loginSaga from 'src/redux/login/sagas';
import emailCheckSaga from 'src/redux/auth/sagas';
import videoListSaga from 'src/redux/videoList/sagas';
import topMenuSaga from 'src/redux/topMenu/sagas';
import opinionArticleDetailSaga from 'src/redux/opinionArticleDetail/sagas';
import userProfileSaga from 'src/redux/profileUserDetail/sagas'
import bookmarkSaga from 'src/redux/bookmark/sagas';
import newPasswordSaga from 'src/redux/changePassword/sagas'
import newsLettersSaga from 'src/redux/newsLetter/sagas';
import keepNotifiedSaga from 'src/redux/keepNotified/sagas';
import podcastSaga from 'src/redux/podcast/sagas';
import contentForYouSaga from 'src/redux/contentForYou/sagas';
import writerDetailSaga from 'src/redux/writersDetail/sagas';
import documentaryVideoSaga from 'src/redux/documentaryVideo/sagas';
import SaveTokenSaga from 'src/redux/notificationSaveToken/sagas';
import ContactUsSaga from 'src/redux/contactUs/sagas'
import WeatherDetailSaga from 'src/redux/weatherDetails/sagas'
import albumListSaga from 'src/redux/photoGallery/sagas';
import journalistSaga from 'src/redux/journalist/sagas';
import deleteMyAccountSaga from '../deleteMyAccount/sagas';
import cartoonSaga from '../cartoon/sagas';
import entityQueueSaga from '../entityQueue/sagas';

describe('Test rootSaga  saga', () => {
  it('fire on rootSaga', () => {
    testSaga(rootSaga)
      .next()
      .all([
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
      ])
      .finish()
      .isDone();
  });
});

