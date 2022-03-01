import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import topMenuSaga, {fetchTopMenu} from '../sagas';
import {
  fetchTopMenuSuccess,
} from '../action';
import {FETCH_TOP_MENU} from '../actionTypes';
import {fetchTopMenuApi} from 'src/services/topMenuService';
import {
  FetchTopMenuSuccessPayloadType,
} from '../types';
import { AxiosError } from 'axios';

const mockString = 'mockString';

const reposnseObject = {
  rows: [
    {
      title: mockString,
      uuid_export: mockString,
      parent_export: null,
      link__options: mockString,
      title_export: mockString,
      sectionid: 1,
      keyname: mockString
    },
  ],
};

const sucessResponseObject: FetchTopMenuSuccessPayloadType = {
    topMenuData: [{sectionId: 1,tabName: mockString,keyName: mockString,isSelected: true}],
};

describe('test Saga  topMenusaga', () => {
  it('fire on topMenuSaga', () => {
    testSaga(topMenuSaga)
      .next()
      .all([takeLatest(FETCH_TOP_MENU, fetchTopMenu)])
      .finish()
      .isDone();
  });

  it('fire on FETCH_TOP_MENU_REQUEST', () => {
    testSaga(fetchTopMenu)
      .next()
      .call(fetchTopMenuApi)
      .next(reposnseObject)
      .put(fetchTopMenuSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });

  it('test fetchSideMenu  error', () => {
    const errorResponse = {
      response: { data: 'Error', status: 500, statusText: 'Error' }
    }
    testSaga(fetchTopMenu)
      .next()
      .call(fetchTopMenuApi)
      .throw(errorResponse as AxiosError)
      .finish()
      .isDone();
  });
});