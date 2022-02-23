import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import sideMenuSaga, {fetchSideMenu} from '../sagas';
import {
  fetchSideMenuFailed,
  fetchSideMenuSuccess,
} from '../action';
import {FETCH_SIDE_MENU} from '../actionTypes';
import {fetchSideMenuApi} from 'src/services/sideMenuService';
import {
  FetchSideMenuSuccessPayloadType,
  FetchSideMenuFailedPayloadtype,
} from '../types';

const mockString = 'mockString';

const reposnseObject = {
  rows: [
    {
      title: mockString,
      uuid_export: mockString,
      parent_export: mockString,
      link__options: mockString,
      title_export: mockString,
      field_sectionid_export: 11,
      field_app_key_name_export: mockString,
    },
  ],
};

const sucessResponseObject: FetchSideMenuSuccessPayloadType = {
    sideMenuData: reposnseObject,
};
const error = new Error('error');
const faildResponseObject: FetchSideMenuFailedPayloadtype = {
    error: error.message
}

describe('test Saga  saga', () => {
  it('fire on searchSaga', () => {
    testSaga(sideMenuSaga)
      .next()
      .all([takeLatest(FETCH_SIDE_MENU, fetchSideMenu)])
      .finish()
      .isDone();
  });

  it('fire on FETCH_SIDE_MENU_REQUEST', () => {
    testSaga(fetchSideMenu)
      .next()
      .call(fetchSideMenuApi)
      .next(reposnseObject)
      .put(fetchSideMenuSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });

  it('test fetchSideMenu  error', () => {
    const error = new Error('error');
    testSaga(fetchSideMenu)
      .next()
      .call(fetchSideMenuApi)
      .throw(error)
      .finish()
      .isDone();
  });

//   it('fire on FETCH_SEARCH_REQUEST', () => {
//     testSaga(fetchSearch, requestAction)
//       .next()
//       .call(fetchSearchApi, requestObject)
//       .throw(error)
//       .put(fetchSearchFailed({error: error.message}))
//       .finish()
//       .isDone();
//   });
});